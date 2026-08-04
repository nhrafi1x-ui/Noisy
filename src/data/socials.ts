export interface SocialLinkItem {
  id: string;
  name: string;
  url: string;
  category: 'code' | 'design' | 'freelance' | 'social';
  username: string;
  iconName: string;
}

export const socialLinks: SocialLinkItem[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/nhrafi0x',
    category: 'code',
    username: '@nhrafi0x',
    iconName: 'Github'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/nhrafi0x',
    category: 'code',
    username: 'nhrafi0x',
    iconName: 'Linkedin'
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    url: 'https://x.com/nhrafi1x',
    category: 'social',
    username: '@nhrafi1x',
    iconName: 'Twitter'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://www.facebook.com/nhrafi0x',
    category: 'social',
    username: 'nhrafi0x',
    iconName: 'Facebook'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/feeel_good.inc',
    category: 'social',
    username: '@feeel_good.inc',
    iconName: 'Instagram'
  },
  {
    id: 'reddit',
    name: 'Reddit',
    url: 'https://www.reddit.com/u/im_the_BUG',
    category: 'social',
    username: 'u/im_the_BUG',
    iconName: 'MessageSquare'
  },
  {
    id: 'fiverr',
    name: 'Fiverr',
    url: 'https://fiverr.com/nh_rafi',
    category: 'freelance',
    username: 'nh_rafi',
    iconName: 'Briefcase'
  },
  {
    id: 'upwork',
    name: 'Upwork',
    url: 'https://www.upwork.com/freelancers/~0176868f526eee3201',
    category: 'freelance',
    username: 'Nazmul Haque Rafi',
    iconName: 'Globe'
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    url: 'https://dribbble.com/nazmul-rafi',
    category: 'design',
    username: 'nazmul-rafi',
    iconName: 'Dribbble'
  },
  {
    id: 'behance',
    name: 'Behance',
    url: 'https://www.behance.net/nhrafi',
    category: 'design',
    username: 'nhrafi',
    iconName: 'Palette'
  },
  {
    id: 'gumroad',
    name: 'Gumroad',
    url: 'https://nhrafi.gumroad.com',
    category: 'freelance',
    username: 'nhrafi.gumroad.com',
    iconName: 'ShoppingBag'
  }
];
