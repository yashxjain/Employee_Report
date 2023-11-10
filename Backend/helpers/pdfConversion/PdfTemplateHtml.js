function DownloadReportTemplate(data) {
  function getCategoryName(index) {
    switch (index) {
      case 0:
        return "Quality of Work";
      case 1:
        return "Attendance and Punctuality";
      case 2:
        return "Reliability";
      case 3:
        return "Communication Skills";
      case 4:
        return "Judgement and Decission Making";
      default:
        return "Unknown Category";
    }
  }
  function getCategoryNames(index) {
    switch (index) {
      case 0:
        return "Knowledge of Position";
      case 1:
        return "Work Consistency";

      default:
        return "Unknown Category";
    }
  }
  return `<!DOCTYPE html>
  <html>
    <head>
      <title>Employee Evaluation Form</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
      />
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 700px;
          margin: 0 auto;
          padding: 10px;
        }
        h3 {
          text-align: center;
        }
        table {
          width: 100%;
          align-items: end;
          border-collapse: collapse;
        }
        table,
        th,
        td {
          border: 1px solid #000;
        }
        th,
        td {
          padding: 5px;
          text-align: left;
        }
        th {
          font-size: 15px;
        }
        a {
          color: green;
          text-decoration: none;
        }
  
        .page-break-before {
          page-break-before: always;
        }
        /* Define a class for the content that forces a page break after it */
        .page-break-after {
          page-break-after: always;
        }
        .no-page-break {
          page-break-inside: avoid;
        }
        /* Define a class for the content that fits within the page height */
        .image {
          position: fixed;
          width: 800px;
          height: 1100px;
          z-index: -1;
          left: 0px;
          top: 0;
        }
      </style>
    </head>
    <body>
      <img
        class="image"
        src="https://rannlabweb.s3.ap-south-1.amazonaws.com/wp-content/uploads/2023/11/10112136/WhatsApp-Image-2023-11-10-at-11.10.57-AM.jpeg"
        alt=""
      />
      <div class="container page-break-before">
        <p style="margin-top: 150px; text-align: right">Date: ${data.date}</p>
  
        <h3>Employee Evaluation Form</h3>
  
        <div class="page-content" style="margin-left: 50px">
          <h4>I. EMPLOYEE INFORMATION</h4>
          <table>
            <tr>
              <td><p>Employee Name: ${data.name}</p></td>
              <td><p>Job Title: ${data.title}</p></td>
            </tr>
             <tr>
              <td><p>Supervisor/Reviewer: ${data.supervisor}</p></td>
               <td>
                 <p>
                   Review Period From ${data.reviewfrom} <br />
                   To: ${data.reviewto}
                 </p>
              </td>
            </tr>
          </table>
        </div>
        <div class="page-break-after page-content" style="margin-left: 50px">
          <h4>II. JOB-SPECIFIC PERFORMANCE CRITERIA</h4>
          <table>
  <tr>
    <th>PERFORMANCE CATEGORY</th>
    <th>RATING</th>
    <th>COMMENTS AND EXAMPLES</th>
  </tr>
  
  ${data.jobspecificperformancecriteria
    .map(
      (category, index) => `
        <tr>
          <td>${getCategoryNames(index)}</td>
          <td>${category[Object.keys(category)][0].rating}</td>
          <td>${category[Object.keys(category)][0].comments}</td>
        </tr>
      `
    )
    .join("")}

  <tr>
    <td>Total</td>
    <td>
      ${data.jobspecificperformancecriteria.reduce(
        (total, category) =>
          total + Number(category[Object.keys(category)][0].rating),
        0
      )}
    </td>
  </tr>
</table>
        </div>
        <div class="page-content" style="margin-left: 50px; margin-top: 200px;">
          <h4>III. CORE VALUES AND OBJECTIVES</h4>
          <table>
             <tr>
               <th>PERFORMANCE CATEGORY</th>
               <th>RATING</th>
               <th>COMMENTS AND EXAMPLES</th>
             </tr>
             ${data.coreValuesAndObjectives
               .map(
                 (category, index) => `
                  <tr>
                    <td>${getCategoryName(index)}</td>
                    <td>${category[Object.keys(category)][0].rating}</td>
                    <td>${category[Object.keys(category)][0].comments}</td>
                  </tr>
                `
               )
               .join("")}
             <tr>
             <td>Total</td>
             <td>
               ${data.coreValuesAndObjectives.reduce(
                 (total, category) =>
                   total + Number(category[Object.keys(category)][0].rating),
                 0
               )}
             </td>
             
             </tr>
           </table>
        </div>
  
        <div class="page-break-after page-content" style="margin-left: 50px">
          <h4>IV. PERFORMANCE GOALS</h4>
          <table>
            <tr>
            <td>${data.performancegoals}</td>
            </tr>
          </table>
        </div>
        <div class="page-content" style="margin-left: 50px; margin-top: 200px;">
          <h4>V. OVERALL RATING</h4>
          <table>
             <tr>
               <td>
                 <input type="checkbox" ${
                   data.overallrating === "Exceeds Expectations"
                     ? "checked"
                     : ""
                 } /> EXCEEDS EXPECTATIONS <br />
                 The employee consistently performs at a high level that exceeds
                 expectations
               </td>
               <td>
                 <input type="checkbox" ${
                   data.overallrating === "MEETS EXPECTATIONS" ? "checked" : ""
                 } />MEETS EXPECTATIONS
                 <br />Employee satisfies all essential job requirements; may
                 exceed expectations periodically; demonstrates the likelihood of
                 eventually exceeding expectations
               </td>
               <td>
                 <input type="checkbox" ${
                   data.overallrating === "NEEDS IMPROVEMENT" ? "checked" : ""
                 }/>NEEDS IMPROVEMENT <br />The
                 employee consistently performs below the required
                 standards/expectations for the position; training or other action
                 is necessary to correct performance
               </td>
               <td>
                 <input type="checkbox" ${
                   data.overallrating === "UNACCEPTABLE" ? "checked" : ""
                 } />UNACCEPTABLE <br />The employee is unable or
                 unwilling to perform required duties according to company
                 standards; immediate improvement must be demonstrated
               </td>
             </tr>
           </table>
        </div>
        <div class="page-content" style="margin-left: 50px">
          <h4>VI. EMPLOYEE COMMENTS (OPTIONAL)</h4>
          <table>
            <tr>
              <td>
                Please respond in the mail. If you want to provide any comment on
                anything.
              </td>
            </tr>
          </table>
        </div>
      </div>
    </body>
  </html>
  `;
}

module.exports = { DownloadReportTemplate };
