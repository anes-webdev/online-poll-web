import { Tooltip, Typography } from "@mui/material";
import { FOOTER_LINKS, type FooterLinkType } from "../../constants/footerLinks";
import "./styles.css";

const FooterLink = ({ href, icon: Icon, tooltipTitle }: FooterLinkType) => {
  return (
    <Tooltip placement="top" title={tooltipTitle}>
      <a target="blank" href={href}>
        <Icon color="action" />
      </a>
    </Tooltip>
  );
};

const Footer = () => {
  return (
    <footer>
      <Typography color="textSecondary" className="text-center text-lg!">
        Follow Me
      </Typography>
      <div>
        {FOOTER_LINKS.map(({ href, icon, id, tooltipTitle }) => {
          return (
            <FooterLink
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
