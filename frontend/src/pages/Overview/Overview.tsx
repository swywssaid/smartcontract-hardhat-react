import styles from "./Overview.module.css";
import {
  Avatar,
  Paper,
  SvgIcon,
  Typography,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import axios from "@api/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@redux/app/store";
import { OverviewDataType } from "../../types/overview";
import HelpIcon from "@mui/icons-material/Help";

const CustomPaper = styled(Paper)({
  position: "relative",
  width: "50%",
  display: "flex",
  flexDirection: "column",
  padding: "1.5rem 1.5rem 0 1.5rem",
  borderRadius: "1.125rem",
  boxShadow: "0 0 2.5rem rgba(0, 0, 0, 0.05)",
});

const CustomHalfPaper = styled(Paper)({
  position: "relative",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "1.5rem 1.5rem 0 1.5rem",
  borderRadius: "1.125rem",
  boxShadow: "0 0 2.5rem rgba(0, 0, 0, 0.05)",
});

const ChartPaper = styled(Paper)({
  width: "35%",
  display: "flex",
  flexDirection: "column",
  padding: "1.5rem 1.5rem 0 1.5rem",
  borderRadius: "1.125rem",
  boxShadow: "0 0 2.5rem rgba(0, 0, 0, 0.05)",
});

// overview 페이지 컴포넌트
function Overview() {
  const pin = useSelector((state: RootState) => state.auth.pin);
  const [isLoading, setIsLoading] = useState(false);
  const [overviewData, setOverviewData] = useState<OverviewDataType>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.post("/web/overview", {
          body: {
            Doc: pin,
          },
        });
        const data = res.data.body.data;
        setOverviewData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className={styles.wrapper}>
        <div>
          <div className={styles.header}>
            <Typography variant="h5" fontWeight="bold" color="#000000" mb={2}>
              출석 현황
            </Typography>
            <Typography variant="subtitle2" color="#aaaaaa" mt={1}>
              나의 출석 현황 정보를 확인할 수 있습니다.
            </Typography>
          </div>
          <div className={styles.container}>
            <CustomPaper elevation={1}>
              <div className={styles.paperHeader}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#000000"
                  mb={1}
                >
                  연속 출석일
                </Typography>
                <div className={styles.avatar}>
                  <Avatar
                    sx={{
                      backgroundColor: "#008FFB",
                      height: 40,
                      width: 40,
                    }}
                  >
                    <SvgIcon>
                      <PersonSearchIcon />
                    </SvgIcon>
                  </Avatar>
                </div>
              </div>
              <Typography variant="caption" color="#aaaaaa" mb={4}>
                나의 연속 출석 일수
              </Typography>
              <div className={styles.content}>
                <Typography
                  variant="body2"
                  fontSize={35}
                  fontWeight="bold"
                  color="#000000"
                >
                  {overviewData?.continuousAttendanceDays}일
                </Typography>
              </div>
            </CustomPaper>
            <CustomPaper elevation={1}>
              <div className={styles.paperHeader}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#000000"
                  mb={1}
                >
                  총 출석일
                </Typography>
                <div className={styles.avatar}>
                  <Avatar
                    sx={{
                      backgroundColor: "#F04438",
                      height: 40,
                      width: 40,
                    }}
                  >
                    <SvgIcon>
                      <AddReactionIcon />
                    </SvgIcon>
                  </Avatar>
                </div>
              </div>
              <Typography variant="caption" color="#aaaaaa" mb={4}>
                전체 등록 기간 중 출석률
              </Typography>
              <div className={styles.content}>
                <Typography
                  variant="body2"
                  fontSize={35}
                  fontWeight="bold"
                  color="#000000"
                  gutterBottom
                >
                  {overviewData?.totalAttendanceDays}일
                </Typography>
              </div>
            </CustomPaper>
            <CustomHalfPaper elevation={1}>
              <div className={styles.paperHeader}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#000000"
                  mb={1}
                  sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  연속 공부 시간
                  <Tooltip
                    title="출석 시간을 기준으로 체크됩니다."
                    placement="top"
                    arrow
                  >
                    <HelpIcon sx={{ color: "#616161" }} />
                  </Tooltip>
                </Typography>
                <div className={styles.avatar}>
                  <Avatar
                    sx={{
                      backgroundColor: "#F79009",
                      height: 40,
                      width: 40,
                    }}
                  >
                    <SvgIcon>
                      <AccessTimeFilledIcon />
                    </SvgIcon>
                  </Avatar>
                </div>
              </div>
              <Typography variant="caption" color="#aaaaaa" mb={4}>
                출석 시간을 기준 연속 공부 시간
              </Typography>
              <div className={styles.content}>
                <Typography
                  variant="body2"
                  fontSize={35}
                  fontWeight="bold"
                  color="#000000"
                  gutterBottom
                >
                  {overviewData?.totalAttendanceDays}일
                </Typography>
              </div>
            </CustomHalfPaper>
          </div>
        </div>
        <div>
          <div className={styles.header}>
            <Typography variant="h5" fontWeight="bold" color="#000000" mb={2}>
              적립금 현황
            </Typography>
            <Typography variant="subtitle2" color="#aaaaaa" mt={1}>
              출석을 통해 획득한 적립금을 확인할 수 있습니다.
            </Typography>
          </div>
          <div className={styles.container}>
            <ChartPaper>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="#000000"
                sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
                mb={1}
              >
                상세 적립률
                <Tooltip
                  title={
                    <span>
                      *연속 출석일 별 적립률
                      <br />
                      <br />
                      매일: 이용권 금액의 0.1%
                      <br />
                      7일 마다: 이용권 금액의 2%
                      <br />
                    </span>
                  }
                  placement="top"
                  arrow
                >
                  <HelpIcon sx={{ color: "#616161" }} />
                </Tooltip>
              </Typography>
              <Typography variant="caption" color="#aaaaaa">
                적립률 기준
              </Typography>
              <div className={styles.donutContainer}>
                <div className={styles.donutLabelsContainer}>
                  <div className={styles.donutLabelsContent}>
                    <SentimentNeutralIcon
                      sx={{
                        borderRadius: "50%",
                        backgroundColor: "#FAFAD2",
                        color: "#FFB400",
                      }}
                    />
                    <div className={styles.donutLabel}>
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        color="#000000"
                        mb={1}
                      >
                        매일: 이용권 금액의 0.1%
                      </Typography>
                    </div>
                  </div>
                  <div className={styles.donutLabelsContent}>
                    <SentimentSatisfiedAltIcon
                      sx={{
                        borderRadius: "50%",
                        backgroundColor: "#F0FFF0",
                        color: "#10b981",
                      }}
                    />
                    <div className={styles.donutLabel}>
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        color="#000000"
                        mb={1}
                      >
                        7일 마다: 이용권 금액의 2%
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </ChartPaper>
          </div>
        </div>
        <div>
          <div className={styles.header}>
            <Typography variant="h5" fontWeight="bold" color="#000000" mb={2}>
              이용자 현황
            </Typography>
            <Typography variant="subtitle2" color="#aaaaaa" mt={1}>
              스터디 카페 이용자의 출석률 및 공부 시간을 알 수 있습니다.
            </Typography>
          </div>
          <div className={styles.container}></div>
        </div>
      </div>
    );
  }
}

export default Overview;
