import React, { useState } from "react";
import { Box, Typography, useTheme, IconButton, Rating } from "@mui/material";
import { tokens } from "../../theme";
import { Divider, Chip } from "@mui/material";
import EmployersLogo from "../../assets/EmployersLogo.png";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const StatBox = ({
  jobTitle,
  employmentType,
  salary,
  employerName,
  onClick,
  rating,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setBookmarked(!bookmarked);
    console.log(bookmarked ? "Bookmark removed" : "Bookmarked");
  };

  return (
    <Box
      display="flex"
      width="425px"
      padding="24px"
      flexDirection="column"
      alignItems="flex-start"
      gap="20px"
      sx={{
        borderRadius: "8px",
        border: "1px solid var(--Gray-100, #E4E5E8)",
        background: "linear-gradient(90deg, #FFF6E6 0%, #FFF 100%), #FFF",
        boxShadow: "0px 2px 18px 0px rgba(24, 25, 28, 0.03)",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          cursor: "pointer", // Add a pointer cursor on hover
        },
      }}
      onClick={onClick} // Call the onClick function when the box is clicked
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="6px"
        alignSelf="stretch"
      >
        <Typography
          fontFamily="Inter"
          fontSize="18px"
          fontStyle="normal"
          fontWeight="500"
          lineHeight="28px"
        >
          {jobTitle}
        </Typography>

        <Box display="flex" alignItems="center" gap="10px">
          <Chip
            sx={{
              borderRadius: "40px",
              background: "var(--Success-50, #E7F6EA)",
            }}
            label={
              <Typography
                color="var(--Success-500, #0BA02C)"
                fontFamily="Inter"
                fontSize="12px"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="12px"
                textTransform="uppercase"
              >
                {employmentType}
              </Typography>
            }
          />
          <Typography
            sx={{
              color: "var(--Gray-500, #767F8C)",
              /* Body/Small/400 */
              fontFamily: "Inter",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "20px",
            }}
          >
            Salary: {salary}
          </Typography>
        </Box>
      </Box>

      {rating && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          alignSelf="stretch"
          gap="12px"
        >
          <Rating value={rating} readOnly precision={0.5} />
        </Box>
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        alignSelf="stretch"
        gap="12px"
      >
        <Box display="flex" alignItems="center" gap="12px">
          <img
            style={{
              display: "flex",
              padding: "12px",
              alignItems: "flex-start",
              gap: "10px",
              borderRadius: "4px",
              background: "var(--Gray-50, #EDEFF5)",
            }}
            src={EmployersLogo}
            alt="EmployersLogo"
          />
          <Typography
            color="var(--Gray-900, #18191C)"
            /* Body/Medium/500 */
            fontFamily="Inter"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="500"
            lineHeight="24px" /* 150% */
          >
            {employerName}
          </Typography>
        </Box>
        <IconButton
          onClick={(event) => {
            event.stopPropagation(); // Prevent triggering the onClick for the box
            handleBookmarkClick();
          }}
        >
          {bookmarked ? (
            <BookmarkIcon sx={{ color: "gold" }} />
          ) : (
            <BookmarkBorderIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default StatBox;
