import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type HomeCardProps = {
  label: string;
  value: number;
  type?: string | undefined;
};
const HomeCard = ({ label, value, type = "default" }: HomeCardProps) => {
  const textColor =
    type === "success"
      ? "success.main"
      : type === "warning"
      ? "warning.main"
      : type === "error"
      ? "error.main"
      : "text.secondary";

  return (
    <Card>
      <CardHeader
        subheader={label}
        subheaderTypographyProps={{ noWrap: true }}
      />
      <CardContent>
        <Typography variant="h4" sx={{ color: textColor }}>
          {new Intl.NumberFormat("de-DE").format(value)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HomeCard;
