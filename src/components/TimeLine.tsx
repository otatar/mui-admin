import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import FortIcon from "@mui/icons-material/Fort";
import KebabDiningIcon from "@mui/icons-material/KebabDining";

const TimeLine = () => {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
        margin: 0,
      }}
    >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <AutoAwesomeIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography variant="body1">
            Nam mauris dolor, malesuada quis porta sed, volutpat et purus. Fusce
            venenatis pulvinar magna, ut vehicula urna molestie ac. Morbi
            aliquet nunc quis magna iaculis, a porttitor elit blandit. Aenean et
            mi in mi porta eleifend
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary">
            <CoPresentIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h6">Mauris nec lacinia lorem.</Typography>
          <Typography variant="body1">
            Aliquam volutpat est sit amet lacus mollis accumsan. Morbi laoreet
            sem ut nibh tincidunt vehicula. Suspendisse pretium suscipit
            feugiat. In fermentum accumsan lacus, sit amet tempus orci vehicula
            eu. Aliquam tempor efficitur sollicitudin.
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="success">
            <FortIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h6">
            Morbi aliquet libero nisi, id rhoncus nibh ultricies eu.
          </Typography>
          <Typography variant="body1">
            Quisque pulvinar nunc sem, at euismod urna condimentum sit amet. Sed
            commodo quis nisl rutrum elementum. Etiam condimentum turpis et
            massa sollicitudin ullamcorper. Morbi hendrerit turpis vel neque
            dapibus, vel venenatis est vulputate.
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default TimeLine;
