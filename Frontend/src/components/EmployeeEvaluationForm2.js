import Checkbox from "@material-ui/core/Checkbox";
import React, { useState, useEffect } from "react";

import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

const cellStyles = {
  border: "1px solid #ddd",
  padding: "8px",
  overflow: "hidden",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  wordBreak: "break-all",
  maxHeight: "30px",
};

const columnWidths = {
  col1: "130px",
  col2: "50px",
  col3: "120px",
  col4: "180px",
};
const columnWidths1 = {
  col5: "50px",
  col6: "50px",
  col7: "50px",
  col8: "50px",
};

const EmployeeEvaluationForm2 = () => {
  const [formDataFromStorage, setFormDataFromStorage] = useState(null);

  const [formData1, setFormData1] = useState({
    jobspecificperformancecriteria: [
      {
        knowledgeofposition: {
          rating: "",
          comments: "",
        },
        workconsistency: {
          rating: "",
          comments: "",
        },
      },
    ],
    performancegoals: "",
    overallrating: "",
    positive: "",
    negative: "",
  });

  // State variables for overall rating checkboxes
  const [exceedsExpectations, setExceedsExpectations] = useState(false);
  const [meetsExpectations, setMeetsExpectations] = useState(false);
  const [needsImprovement, setNeedsImprovement] = useState(false);
  const [unacceptable, setUnacceptable] = useState(false);

  // Function to handle changes in the checkboxes
  const handleOverallRatingChange = (rating) => {
    // Update the respective state variable for the checkbox and set other checkboxes to false
    setExceedsExpectations(rating === "exceedsExpectations");
    setMeetsExpectations(rating === "meetsExpectations");
    setNeedsImprovement(rating === "needsImprovement");
    setUnacceptable(rating === "unacceptable");

    // Update formData1's overallrating based on the checked checkbox
    setFormData1((prevFormData) => ({
      ...prevFormData,
      overallrating:
        rating === "exceedsExpectations"
          ? "EXCEEDS EXPECTATIONS"
          : rating === "meetsExpectations"
          ? "MEETS EXPECTATIONS"
          : rating === "needsImprovement"
          ? "NEEDS IMPROVEMENT"
          : "UNACCEPTABLE",
    }));
  };

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormDataFromStorage(JSON.parse(storedFormData));
    }
  }, []);

  const handleChange = (e, section, fieldName, fieldType) => {
    const { value } = e.target;

    setFormData1((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      switch (section) {
        case "knowledgeofposition":
          updatedFormData.jobspecificperformancecriteria[0][fieldName][
            fieldType
          ] = value;
          break;
        case "performancegoals":
          updatedFormData.performancegoals = value;
          break;
        case "positive":
          updatedFormData.positive = value;
          break;
        case "negative":
          updatedFormData.negative = value;
          break;
        default:
          break;
      }

      return updatedFormData;
    });
  };

  const handleSubmitForm2 = () => {
    const combinedFormData = {
      ...formData1,
      ...formDataFromStorage,
    };

    console.log("Data to be submitted:", combinedFormData);

    axios
      .post("http://localhost:2033/report/post", combinedFormData)
      .then((response) => {
        console.log("Data sent successfully");
        console.log("API Response:", response.data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom></Typography>
        <form>
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col1 }}
                    align="center"
                    colSpan={4}
                  >
                    <h2>JOB-SPECIFIC PERFORMANCE CRITERIA</h2>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col1 }}
                  >
                    <strong>PERFORMANCE CATEGORY</strong>
                  </TableCell>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col2 }}
                  >
                    <strong> RATING</strong>
                  </TableCell>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col3 }}
                  >
                    <strong> COMMENTS AND EXAMPLES</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col1 }}
                    contentEditable={true}
                  >
                    <div>
                      <strong> Knowledge of Position:</strong>
                    </div>
                  </TableCell>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col2 }}
                    contentEditable={true}
                  >
                    <TextField
                      value={
                        formData1.jobspecificperformancecriteria[0]
                          ?.knowledgeofposition?.rating || ""
                      }
                      onChange={(e) =>
                        handleChange(
                          e,
                          "knowledgeofposition",
                          "knowledgeofposition",
                          "rating"
                        )
                      }
                    />
                  </TableCell>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col3 }}
                  >
                    <TextField
                      value={
                        formData1.jobspecificperformancecriteria[0]
                          ?.knowledgeofposition?.comments
                      }
                      onChange={(e) =>
                        handleChange(
                          e,
                          "knowledgeofposition",
                          "knowledgeofposition",
                          "comments"
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col1 }}
                    contentEditable={true}
                  >
                    <div>
                      <strong>Quality of Work:</strong>
                    </div>
                  </TableCell>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col2 }}
                    contentEditable={true}
                  >
                    <TextField
                      value={
                        formData1.jobspecificperformancecriteria[0]
                          ?.workconsistency?.rating || ""
                      }
                      onChange={(e) =>
                        handleChange(
                          e,
                          "knowledgeofposition",
                          "workconsistency",
                          "rating"
                        )
                      }
                    />
                  </TableCell>

                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col3 }}
                  >
                    <TextField
                      value={
                        formData1.jobspecificperformancecriteria[0]
                          ?.workconsistency?.comments
                      }
                      onChange={(e) =>
                        handleChange(
                          e,
                          "knowledgeofposition",
                          "workconsistency",
                          "comments"
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col1 }}
                    align="center"
                    colSpan={4}
                  >
                    <h2> PERFORMANCE GOALS</h2>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col1 }}
                    contentEditable={true}
                  >
                    <TextField
                      fullWidth
                      id="PerformanceGoals"
                      name="performancegoals"
                      label="performance goals"
                      placeholder="performance goals"
                      value={formData1.performancegoals}
                      onChange={(e) => handleChange(e, "performancegoals")}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col1 }}
                    align="center"
                    colSpan={4}
                  >
                    <h2>Overall Ratings</h2>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    style={{
                      ...cellStyles,
                      width: columnWidths1.col5,
                      height: "150px",
                    }}
                  >
                    <div style={{ position: "relative", height: "100%" }}>
                      <Checkbox
                        checked={exceedsExpectations}
                        onChange={() =>
                          handleOverallRatingChange("exceedsExpectations")
                        }
                        color="primary"
                      />
                      <Typography
                        style={{ position: "absolute", top: 10, left: 33 }}
                      >
                        EXCEEDS EXPECTATIONS
                      </Typography>
                      
                    </div>
                  </TableCell>

                  <TableCell
                    style={{
                      ...cellStyles,
                      width: columnWidths1.col6,
                      height: "150px",
                    }}
                  >
                    <div style={{ position: "relative", height: "100%" }}>
                      <Checkbox
                        checked={meetsExpectations}
                        onChange={() =>
                          handleOverallRatingChange("meetsExpectations")
                        }
                        color="primary"
                      />
                      <Typography
                        style={{ position: "absolute", top: 10, left: 33 }}
                      >
                        MEETS EXPECTATIONS
                      </Typography>
                      {/* Cell Content */}
                    </div>
                  </TableCell>
                  <TableCell
                    style={{
                      ...cellStyles,
                      width: columnWidths1.col7,
                      height: "150px",
                    }}
                  >
                    <div style={{ position: "relative", height: "100%" }}>
                      <Checkbox
                        checked={needsImprovement}
                        onChange={() =>
                          handleOverallRatingChange("needsImprovement")
                        }
                        color="primary"
                      />
                      <Typography
                        style={{ position: "absolute", top: 10, left: 33 }}
                      >
                        NEEDS IMPROVEMENT
                      </Typography>
                      {/* Cell Content */}
                    </div>
                  </TableCell>
                  <TableCell
                    style={{
                      ...cellStyles,
                      width: columnWidths1.col8,
                      height: "150px",
                    }}
                  >
                    <div style={{ position: "relative", height: "100%" }}>
                      <Checkbox
                        checked={unacceptable}
                        onChange={() =>
                          handleOverallRatingChange("unacceptable")
                        }
                        color="primary"
                      />
                      <Typography
                        style={{ position: "absolute", top: 10, left: 33 }}
                      >
                        UNACCEPTABLE
                      </Typography>
                      {/* Cell Content */}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ height: "150px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                      }}
                    >
                      {/* First set of data at the top */}
                      <div style={{ lineHeight: "1.5" }}>
                        <br />
                        <TextField
                          fullWidth
                          id="positive"
                          name="positive"
                          label="positive"
                          placeholder="positive"
                          value={formData1.positive}
                          onChange={(e) => handleChange(e, "positive")}
                        />
                      </div>
                      {/* Second set of data at the bottom */}
                      <div style={{ lineHeight: "1.5" }}>
                        <br />
                        <TextField
                          fullWidth
                          id="negative"
                          name="negative"
                          label="negative"
                          placeholder="negative"
                          value={formData1.negative}
                          onChange={(e) => handleChange(e, "negative")}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </form>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitForm2}
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default EmployeeEvaluationForm2;
