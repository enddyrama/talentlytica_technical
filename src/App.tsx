import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface StudentData {
  [aspek: string]: {
    [mahasiswa: string]: number | undefined;
  };
}

const initialData: StudentData = {
  aspek_penilaian_1: {},
  aspek_penilaian_2: {},
  aspek_penilaian_3: {},
  aspek_penilaian_4: {}
};

const App = () => {
  const [studentData, setStudentData] = useState<StudentData>(initialData);

  const handleSelectChange = (
    aspek: string,
    mahasiswa: string,
    value: number
  ) => {
    setStudentData((prevData) => ({
      ...prevData,
      [aspek]: {
        ...prevData[aspek],
        [mahasiswa]: value
      }
    }));
  };

  const renderTableHeader = () => {
    const headers = ["Nama", "Aspek Penilaian 1", "Aspek Penilaian 2", "Aspek Penilaian 3", "Aspek Penilaian 4"];

    return (
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    );
  };

  const renderTableRow = (mahasiswa: string) => {
    return (
      <tr key={mahasiswa}>
        <td>{mahasiswa}</td>
        <td>
          <select
            style={{ width: `100%` }}
            value={studentData.aspek_penilaian_1[mahasiswa] || ""}
            onChange={(e) =>
              handleSelectChange("aspek_penilaian_1", mahasiswa, parseInt(e.target.value))
            }
          >
            <option value="">- Pilih -</option>
            {renderOptions()}
          </select>
        </td>
        <td>
          <select
            style={{ width: `100%` }}
            value={studentData.aspek_penilaian_2[mahasiswa] || ""}
            onChange={(e) =>
              handleSelectChange("aspek_penilaian_2", mahasiswa, parseInt(e.target.value))
            }
          >
            <option value="">- Pilih -</option>
            {renderOptions()}
          </select>
        </td>
        <td>
          <select
            style={{ width: `100%` }}
            value={studentData.aspek_penilaian_3[mahasiswa] || ""}
            onChange={(e) =>
              handleSelectChange("aspek_penilaian_3", mahasiswa, parseInt(e.target.value))
            }
          >
            <option value="">- Pilih -</option>
            {renderOptions()}
          </select>
        </td>
        <td>
          <select
            style={{ width: `100%` }}
            value={studentData.aspek_penilaian_4[mahasiswa] || ""}
            onChange={(e) =>
              handleSelectChange("aspek_penilaian_4", mahasiswa, parseInt(e.target.value))
            }
          >
            <option value="">- Pilih -</option>
            {renderOptions()}
          </select>
        </td>
      </tr>
    );
  };

  const renderOptions = () => {
    const options = [];

    for (let i = 1; i <= 10; i++) {
      options.push(<option value={i} key={i}>{i}</option>);
    }

    return options;
  };

  const renderTableBody = () => {
    const students = [
      "Mahasiswa 1",
      "Mahasiswa 2",
      "Mahasiswa 3",
      "Mahasiswa 4",
      "Mahasiswa 5",
      "Mahasiswa 6",
      "Mahasiswa 7",
      "Mahasiswa 8",
      "Mahasiswa 9",
      "Mahasiswa 10"
    ];

    return students.map((student) => renderTableRow(student));
  };

  const renderDataJson = () => {
    return JSON.stringify(studentData, null, 2);
  };

  const downloadDataAsJSON = (data: StudentData, filename: string) => {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <table>
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: `10px 0px 10px 0px` }}>
        <button
        onClick={()=>downloadDataAsJSON(studentData, "studentdata")}
          style={{
            width: `20%`, background: 'black', color: "white"
          }}>Simpan</button>
      </div>
      <h2>JSON Data:</h2>
      <pre>{renderDataJson()}</pre>
    </div>
  );
}

export default App;
