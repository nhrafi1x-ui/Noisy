import fs from 'fs';
import path from 'path';

// Helper to create a valid minimal multi-page PDF with Helvetica text
function createSimplePDF(title, pagesText) {
  let objects = [];
  let fontObjNum = 3;
  
  // Page objects will start after Catalog (1), Pages (2), Font (3)
  let currentObj = 4;
  let pageObjNums = [];
  let contentObjNums = [];

  pagesText.forEach(() => {
    pageObjNums.push(currentObj++);
    contentObjNums.push(currentObj++);
  });

  let catalog = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;
  let font = `3 0 obj\n<< /Type /Font /Subtype /Type1 /Name /F1 /BaseFont /Helvetica >>\nendobj\n`;
  let fontBold = `4 0 obj\n<< /Type /Font /Subtype /Type1 /Name /F2 /BaseFont /Helvetica-Bold >>\nendobj\n`;

  // Update object offset index
  currentObj = 5;
  pageObjNums = [];
  contentObjNums = [];

  pagesText.forEach(() => {
    pageObjNums.push(currentObj++);
    contentObjNums.push(currentObj++);
  });

  let pagesKidRefs = pageObjNums.map(n => `${n} 0 R`).join(' ');
  let pages = `2 0 R obj\n<< /Type /Pages /Kids [ ${pagesKidRefs} ] /Count ${pagesText.length} >>\nendobj\n`.replace('2 0 R obj', '2 0 obj');

  let pdfHeader = `%PDF-1.4\n`;
  let body = catalog + pages + font + fontBold;

  let offsets = [0, pdfHeader.length];

  pagesText.forEach((pageLines, index) => {
    let pNum = pageObjNums[index];
    let cNum = contentObjNums[index];

    let streamLines = ['BT', '/F1 10 Tf', '14 TL', '50 750 Td'];
    pageLines.forEach(line => {
      if (!line) {
        streamLines.push('T*');
      } else if (line.startsWith('# ')) {
        let text = line.substring(2).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
        streamLines.push(`/F2 16 Tf (${text}) Tj T* /F1 10 Tf`);
      } else if (line.startsWith('## ')) {
        let text = line.substring(3).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
        streamLines.push(`/F2 12 Tf (${text}) Tj T* /F1 10 Tf`);
      } else if (line.startsWith('• ')) {
        let text = line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
        streamLines.push(`(${text}) Tj T*`);
      } else {
        let text = line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
        streamLines.push(`(${text}) Tj T*`);
      }
    });
    streamLines.push('ET');

    let streamContent = streamLines.join('\n');
    let streamObj = `${cNum} 0 obj\n<< /Length ${streamContent.length} >>\nstream\n${streamContent}\nendstream\nendobj\n`;
    let pageObj = `${pNum} 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /MediaBox [0 0 612 792] /Contents ${cNum} 0 R >>\nendobj\n`;

    body += pageObj + streamObj;
  });

  return body;
}

// Generate simple PDF string with proper PDF binary header & xref
function buildFullPdf(title, pageSections) {
  let content = [];
  content.push('%PDF-1.4');
  
  let catalogObj = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj';
  let fontF1 = '3 0 obj\n<< /Type /Font /Subtype /Type1 /Name /F1 /BaseFont /Helvetica >>\nendobj';
  let fontF2 = '4 0 obj\n<< /Type /Font /Subtype /Type1 /Name /F2 /BaseFont /Helvetica-Bold >>\nendobj';

  let pageCount = pageSections.length;
  let pageObjStart = 5;
  let pageRefs = [];
  for (let i = 0; i < pageCount; i++) {
    pageRefs.push(`${pageObjStart + i * 2} 0 R`);
  }

  let pagesObj = `2 0 obj\n<< /Type /Pages /Kids [${pageRefs.join(' ')}] /Count ${pageCount} >>\nendobj`;

  let pdfObjects = [catalogObj, pagesObj, fontF1, fontF2];

  pageSections.forEach((lines, i) => {
    let pObjNum = pageObjStart + i * 2;
    let cObjNum = pObjNum + 1;

    let stream = ['BT', '50 740 Td', '14 TL'];
    lines.forEach(line => {
      let safeText = line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
      if (line.startsWith('HEADER:')) {
        let text = safeText.replace('HEADER:', '');
        stream.push(`/F2 16 Tf (${text}) Tj T* /F1 10 Tf`);
      } else if (line.startsWith('SECTION:')) {
        let text = safeText.replace('SECTION:', '');
        stream.push(`T* /F2 12 Tf (${text}) Tj T* /F1 10 Tf`);
      } else if (line.trim() === '') {
        stream.push('T*');
      } else {
        stream.push(`(${safeText}) Tj T*`);
      }
    });
    stream.push('ET');

    let streamStr = stream.join('\n');
    let cObj = `${cObjNum} 0 obj\n<< /Length ${streamStr.length} >>\nstream\n${streamStr}\nendstream\nendobj`;
    let pObj = `${pObjNum} 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /MediaBox [0 0 612 792] /Contents ${cObjNum} 0 R >>\nendobj`;

    pdfObjects.push(pObj);
    pdfObjects.push(cObj);
  });

  let pdfBody = pdfObjects.join('\n\n');
  let fullDoc = '%PDF-1.4\n\n' + pdfBody + '\n\n';

  // Compute xref
  let lines = fullDoc.split('\n');
  let xref = ['xref', `0 ${pdfObjects.length + 1}`, '0000000000 65535 f '];
  
  // Calculate offset of each object
  let offset = '%PDF-1.4\n\n'.length;
  pdfObjects.forEach(obj => {
    let padded = String(offset).padStart(10, '0');
    xref.push(`${padded} 00000 n `);
    offset += obj.length + 2; // +2 for \n\n
  });

  let xrefStr = xref.join('\n');
  let trailer = `trailer\n<< /Size ${pdfObjects.length + 1} /Root 1 0 R >>\nstartxref\n${offset}\n%%EOF`;

  return fullDoc + xrefStr + '\n' + trailer;
}

const cvPage1 = [
  'HEADER:Md. Nazmul Haque Rafi',
  'Netrakona, Mymensingh, Bangladesh | +8801641014745',
  'nhrafi.business@gmail.com | www.linkedin.com/in/nhrafi0x | github.com/nhrafi0x',
  '',
  'SECTION:CAREER OBJECTIVE',
  'I am Nazmul Haque Rafi, a computer science student with a strong passion for automation, DevOps,',
  'data engineering, and cybersecurity. I enjoy solving real problems, building efficient systems, and',
  'understanding how technology works at scale. Driven by a desire to learn deeply and work on high-impact',
  'technical challenges. Long-term goal is to grow as a DevOps engineer, data engineer, and security analyst.',
  '',
  'SECTION:EDUCATIONAL QUALIFICATIONS',
  '• B.Sc in Software Engineering - Daffodil International University (SGPA: 3.75, 4th semester)',
  '• Higher Secondary Certificate (HSC) - Netrakona Govt. College, Netrakona (Science, GPA: 5.00/5.00, 2020)',
  '• Secondary School Certificate (SSC) - Anjuman Adarsha Govt. High School, Netrakona (Science, GPA: 5.00/5.00, 2018)',
  '',
  'SECTION:RESEARCH PUBLICATIONS (On-going)',
  '• Research Letter accepted in DIU Journal of Allied Health & Sciences:',
  '  "Dengue Fever: A Persistent Public Health Challenge in Bangladesh"',
  '',
  'SECTION:ACHIEVEMENTS AND AWARDS',
  '• Best Research Proposal Award - "Meet the Researchers" organized by DIU Research Society (2024)'
];

const cvPage2 = [
  'HEADER:Md. Nazmul Haque Rafi - Technical & Community',
  '',
  'SECTION:TECHNICAL SKILLS AND SOFTWARE PROFICIENCIES',
  '• Programming Languages: C, Python, Basic Java',
  '• Web Development: HTML, CSS, JavaScript, PHP',
  '• Core CS: Data Structures, Algorithms, Operating Systems (Windows, Mac OS)',
  '• Productivity & Creative Tools: MS Office, CapCut, Canva, Premiere Pro, Snapseed, UI/UX Design',
  '• Digital Marketing & AI Automation: n8n, Zapier, Make, AI Prompts',
  '',
  'SECTION:LEADERSHIP & VOLUNTEERING',
  '• Organizing Secretary (Jan 2025 - Present), Daffodil International University Research Society',
  '  Organized 10+ successful seminars and coordinated international lecture series.',
  '• Executive Member (July 2023 - Jan 2024), DIU Software Engineering Club',
  '',
  'SECTION:PERSONAL INFO & LANGUAGES',
  '• Languages: Bangla (Native), English (Fluent / MOI)',
  '• Permanent Address: Village: Kurpar, P.O: Netrakona (2400), Netrakona Sadar',
  '• Date of Birth: 12 December 2002 | Blood Group: A (+ve)',
  '',
  'SECTION:REFEREES',
  '• Dr. Imran Mahmud - Professor & Head, Dept of Software Engineering, Daffodil International University',
  '  Email: imranmahmud@daffodilvarsity.edu.bd | Contact: +8801847140117',
  '• Mr. Askar Ibn Azad - Software Engineer, Next IT Ltd, Gulshan, Dhaka',
  '  Email: askaribn223@gmail.com | Contact: +8801751242425'
];

const resumePage1 = [
  'HEADER:NAZMUL HAQUE RAFI - Software Engineer',
  'Dhaka, Bangladesh | +880 1641-014745 | nhrafi.business@gmail.com | linkedin.com/in/nhrafi0x',
  '',
  'SECTION:PROFILE',
  'Passionate software engineering student with a strong interest in problem-solving, AI innovation, and',
  'full-stack web development. Thrives in both collaborative environments and independent technical projects.',
  '',
  'SECTION:EDUCATION',
  '• B.Sc in Software Engineering, Daffodil International University (2023 - Present)',
  '',
  'SECTION:EXPERTISE & SKILLS',
  '• Programming: C, C++, Java, Python, Pandas, Numpy',
  '• Web Development: HTML, CSS, JavaScript, React, Tailwind CSS, Frontend Engineering',
  '• AI & ML: Generative AI Prompt Engineering, Python ML Libraries, Automation',
  '• Creative & Marketing: Graphics Design, Digital Marketing, Team Leadership',
  '',
  'SECTION:WORK & PROJECT EXPERIENCE',
  '• Web Development: Custom website design & frontend architecture (e.g., Bunny Cakes)',
  '• Machine Learning & AI: Generative AI Prompt Specialist, Python data processing for research',
  '• Extracurricular & Leadership: Organizing Secretary at DIU Research Society, Protocol Volunteer ICPC 2024 Regional',
  '',
  'SECTION:REFERENCES',
  '• Dr. Imran Mahmud (Professor & Head, Dept of SE, DIU) - imranmahmud@daffodilvarsity.edu.bd',
  '• Askar Ibn Azad (Senior .NET Developer, Royex Tech Dubai) - askar.ibn@gmail.com'
];

fs.writeFileSync(path.join(process.cwd(), 'public', 'CV_Md_Nazmul_Haque_Rafi.pdf'), buildFullPdf('CV', [cvPage1, cvPage2]));
fs.writeFileSync(path.join(process.cwd(), 'public', 'Resume_Nazmul_Haque_Rafi.pdf'), buildFullPdf('Resume', [resumePage1]));

console.log('PDF files generated successfully in public directory!');
