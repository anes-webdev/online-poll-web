import { Tooltip, Typography } from '@mui/material';
import { FOOTER_LINKS, type FooterLinkType } from '../../constants/footerLinks';
import './styles.css';
import type { Ref } from 'react';

const FooterLink = ({ href, icon: Icon, tooltipTitle }: FooterLinkType) => {
  return (
    <Tooltip placement="top" title={tooltipTitle}>
      <a target="blank" href={href}>
        <Icon color="action" />
      </a>
    </Tooltip>
  );
};

type FooterProps = {
  ref: Ref<HTMLElement>;
};

const Footer = ({ ref }: FooterProps) => {
  return (
    <footer ref={ref} className="footer">
      <Typography color="textSecondary" className="text-center text-lg!">
        Follow Me
      </Typography>
      <div>
        {FOOTER_LINKS.map(({ href, icon, id, tooltipTitle }) => {
          return (
            <FooterLink
              key={id}
              href={href}
              icon={icon}
              id={id}
              tooltipTitle={tooltipTitle}
            />
          );
        })}
      </div>
      <Typography
        color="textSecondary"
        variant="body2"
        className="text-center mt-2.5!"
      >
        Made by Anes Hekmatshoar
      </Typography>
    </footer>
  );
};
export default Footer;
