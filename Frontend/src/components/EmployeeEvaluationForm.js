import React, { useState } from "react";

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
  Box,
} from "@mui/material";
import { useHistory, useNavigate } from "react-router-dom"; // Step 1
import axios from "axios";

const cellStyles = {
  border: "1px solid #ddd",
  padding: "8px",
  overflow: "hidden",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  wordBreak: "break-all",
  Height: "30px", // Limit the height to the fixed height
};

const columnWidths = {
  col1: "130px", // Set the width for the first column
  col2: "50px", // Set the width for the second column
  col3: "120px", // Set the width for the third column
  col4: "180px", // Set the width for the fourth column
};

const EmployeeEvaluationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    title: "",
    supervisor: "",
    reviewto: "",
    reviewfrom: "",
    coreValuesAndObjectives: [
      {
        qualityofwork: {
          rating: null,
          comments: "",
        },
        attendanceandPunctuality: {
          rating: null,
          comments: "",
        },
        reliability: {
          rating: null,
          comments: "",
        },
        communicationSkills: {
          rating: null,
          comments: "",
        },
        judgement: {
          rating: null,
          comments: "",
        },
      },
    ],
  });

  const handleChange = (e, section, fieldName, fieldType) => {
    const { value } = e.target;
    if (section === "employeeInfo") {
      setFormData({ ...formData, [fieldName]: value });
    } else if (section === "qualityOfWork") {
      const updatedFormData = { ...formData };
      if (fieldName === "qualityofwork") {
        updatedFormData.coreValuesAndObjectives[0][fieldName][fieldType] =
          value;
      } else if (fieldName === "attendanceandPunctuality") {
        updatedFormData.coreValuesAndObjectives[0][fieldName][fieldType] =
          value;
      } else if (fieldName === "reliability") {
        updatedFormData.coreValuesAndObjectives[0][fieldName][fieldType] =
          value;
      } else if (fieldName === "communicationSkills") {
        updatedFormData.coreValuesAndObjectives[0][fieldName][fieldType] =
          value;
      } else if (fieldName === "judgement") {
        updatedFormData.coreValuesAndObjectives[0][fieldName][fieldType] =
          value;
      }

      setFormData(updatedFormData);
    }
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleNextClick = () => {
    localStorage.setItem("formData", JSON.stringify(formData));

    navigate("/Generatereport2");
  };

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "20%" }}>
                <Box p={1} mt={-24}>
                  <Typography variant="h5" gutterBottom></Typography>
                  <TextField
                    fullWidth
                    id="Date"
                    name="date"
                    label="Date"
                    placeholder="Date"
                    value={formData.date}
                    onChange={(e) => handleChange(e, "employeeInfo", "date")}
                  />
                </Box>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography variant="h5" gutterBottom>
                  Employee Information
                </Typography>
                <Box p={2}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <TextField
                              fullWidth
                              id="employeeName"
                              name="name" // Update the name to match the state property
                              label="Employee Name"
                              placeholder="Employee Name"
                              value={formData.name} // Bind value to the state
                              onChange={(e) =>
                                handleChange(e, "employeeInfo", "name")
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              id="jobTitle"
                              name="title"
                              label="Job Title"
                              placeholder="Job Title"
                              value={formData.title}
                              onChange={(e) =>
                                handleChange(e, "employeeInfo", "title")
                              }
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <TextField
                              fullWidth
                              id="supervisor"
                              name="supervisor"
                              label="Supervisor"
                              placeholder="Supervisor"
                              value={formData.supervisor}
                              onChange={(e) =>
                                handleChange(e, "employeeInfo", "supervisor")
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              id="reviewfrom"
                              name="reviewfrom"
                              label="review from"
                              placeholder="review from"
                              value={formData.reviewfrom}
                              onChange={(e) =>
                                handleChange(e, "employeeInfo", "reviewfrom")
                              }
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            {/* Another field for Date To */}
                            <TextField
                              fullWidth
                              id="dateTo"
                              name="reviewto"
                              label="review to"
                              placeholder="review to"
                              value={formData.reviewto}
                              onChange={(e) =>
                                handleChange(e, "employeeInfo", "reviewto")
                              }
                            />
                          </TableCell>
                          {/* Leave one TableCell empty to align with the layout */}
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
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
                <h2>Core Values And Objectives</h2>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ ...cellStyles, width: columnWidths.col1 }}>
                <strong>PERFORMANCE CATEGORY</strong>
              </TableCell>
              <TableCell style={{ ...cellStyles, width: columnWidths.col2 }}>
                <strong> RATING</strong>
              </TableCell>
              <TableCell style={{ ...cellStyles, width: columnWidths.col3 }}>
                <strong> COMMENTS AND EXAMPLES</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{ ...cellStyles, width: columnWidths.col1 }}>
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
                    formData.coreValuesAndObjectives[0]?.qualityofwork?.rating
                  }
                  onChange={(e) =>
                    handleChange(e, "qualityOfWork", "qualityofwork", "rating")
                  }
                />
              </TableCell>
              <TableCell
                style={{ ...cellStyles, width: columnWidths.col3 }}
                contentEditable={true}
              >
                <TextField
                  value={
                    formData.coreValuesAndObjectives[0]?.qualityofwork?.comments
                  }
                  onChange={(e) =>
                    handleChange(
                      e,
                      "qualityOfWork",
                      "qualityofwork",
                      "comments"
                    )
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ ...cellStyles, width: columnWidths.col1 }}>
                <div>
                  <strong>Attendance and Punctuality:</strong>
                </div>
              </TableCell>
              <TableCell
                style={{ ...cellStyles, width: columnWidths.col2 }}
                contentEditable={true}
              >
                <TextField
                  value={
                    formData.coreValuesAndObjectives[0]
                      ?.attendanceandPunctuality?.rating
                  }
                  onChange={(e) =>
                    handleChange(
                      e,
                      "qualityOfWork",
                      "attendanceandPunctuality",
                      "rating"
                    )
                  }
                />
              </TableCell>
              <TableCell
                style={{ ...cellStyles, width: columnWidths.col3 }}
                contentEditable={true}
              >
                <TextField
                  value={
                    formData.coreValuesAndObjectives[0]
                      ?.attendanceandPunctuality?.comments
                  }
                  onChange={(e) =>
                    handleChange(
                      e,
                      "qualityOfWork",
                      "attendanceandPunctuality",
                      "comments"
                    )
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={{ ...cellStyles, width: columnWidths.col1 }}>
                <div>
                  <strong>Reliability:</strong>
                </div>
              </TableCell>
              <TableCell
                style={{ ...cellStyles, width: columnWidths.col2 }}
                contentEditable={true}
              >
                <TextField
                  value={
                    formData.coreValuesAndObjectives[0]?.reliability?.rating
                  }
                  onChange={(e) =>
                    handleChange(e, "qualityOfWork", "reliability", "rating")
                  }
                />
              </TableCell>
              <TableCell
                style={{ ...cellStyles, width: columnWidths.col3 }}
                contentEditable={true}
              >
                <TextField
                  value={
                    formData.coreValuesAndObjectives[0]?.reliability?.comments
                  }
                  onChange={(e) =>
                    handleChange(e, "qualityOfWork", "reliability", "comments")
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ ...cellStyles, width: columnWidths.col1 }}>
                <div>
                  <strong>Communication and Skills:</strong>
                </div>
              </TableCell>
              <TableCell
                style={{ ...cellStyles, width: columnWidths.col2 }}
                contentEditable={true}
              >
                <TextField
                  value={
                    formData.coreValuesAndObjectives[0]?.communicationSkills
                      ?.rating
                  }
                  onChange={(e) =>
                    handleChange(
                      e,
                      "qualityOfWork",
                      "communicationSkills",
                      "rating"
                    )
                  }
                />
              </TableCell>
              <TableCell
                style={{ ...cellStyles, width: columnWidths.col3 }}
                contentEditable={true}
              >
                <TextField
                  value={
                    formData.coreValuesAndObjectives[0]?.communicationSkills
                      ?.comments
                  }
                  onChange={(e) =>
                    handleChange(
                      e,
                      "qualityOfWork",
                      "communicationSkills",
                      "comments"
                    )
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ ...cellStyles, width: columnWidths.col1 }}>
                <div>
                  <strong>Judgement and Decission Making:</strong>
                </div>
              </TableCell>
              <TableCell
                style={{ ...cellStyles, width: columnWidths.col2 }}
                contentEditable={true}
              >
                <TextField
                  value={formData.coreValuesAndObjectives[0]?.judgement?.rating}
                  onChange={(e) =>
                    handleChange(e, "qualityOfWork", "judgement", "rating")
                  }
                />
              </TableCell>
              <TableCell
                style={{ ...cellStyles, width: columnWidths.col3 }}
                contentEditable={true}
              >
                <TextField
                  value={
                    formData.coreValuesAndObjectives[0]?.judgement?.comments
                  }
                  onChange={(e) =>
                    handleChange(e, "qualityOfWork", "judgement", "comments")
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNextClick} // This only stores data in local storage and navigates to Form 2
        style={{ marginTop: "20px" }}
      >
        Next
      </Button>
    </Container>
  );
};

export default EmployeeEvaluationForm;
