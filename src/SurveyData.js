import React from 'react';

const SurveyData = ({surveyDataList}) => {
    const surveyData = surveyDataList.map((data, i) => {
      return(
        
      <tr key={data._id}>
        <td>{i+1}</td>
        <td>{data.name}</td>
        <td>{data.email}</td>
        <td>{data.gender}</td>
        <td>{data.age}</td>
        <td>{data.question1}</td>
        <td>{data.courses.join('/ ')}</td>
        <td>{data.question3}</td>
      </tr>          
    )});

    return surveyData;
}

export default SurveyData;