/* eslint-disable @typescript-eslint/no-empty-object-type */
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconTypeMap } from '@mui/material';

export type FooterLinkType = {
  id: string;
  href: string;
  tooltipTitle: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
};

export const FOOTER_LINKS: FooterLinkType[] = [
  {
    id: 'gmail',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=anes.webdev@gmail.com',
    tooltipTitle: 'Contact me on Gmail',
    icon: EmailIcon,
  },
  {
    id: 'github',
    href: 'https://github.com/anes-webdev/',
    tooltipTitle: 'Git Hub',
    icon: GitHubIcon,
  },
  {
    id: 'linkedin',
    href: 'http://linkedin.com/in/anes-hekmatshoar-837557196',
    tooltipTitle: 'Linked In',
    icon: LinkedInIcon,
  },
];
