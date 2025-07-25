import Typography from "@mui/material/Typography";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { Link, useLocation } from "react-router-dom";
import { pathMap } from "./Breadcrumbs.types";
import { StyledBreadcrumbs } from "./BreadcrumbsStyled";

export function NavbarBreadcrumbs() {
  const isUuid = (str: string) => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(str);
  };
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x && !isUuid(x));

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="body1">Dashboard</Typography>
      </Link>
      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const displayName = pathMap[value] || value;

        if (isLast) {
          return (
            <Typography
              key={to}
              variant="body1"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {displayName}
            </Typography>
          );
        }

        return (
          <Link
            to={to}
            key={to}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="body1">{displayName}</Typography>
          </Link>
        );
      })}
    </StyledBreadcrumbs>
  );
}
