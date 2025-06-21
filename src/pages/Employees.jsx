import React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { GrLocation } from 'react-icons/gr';

import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';

// Local template functions (used in employeesGrid)
const gridEmployeeProfile = (props) => (
  <div className="flex items-center gap-2">
    <img className="rounded-full w-10 h-10" src={props.EmployeeImage} alt="employee" />
    <p>{props.Name}</p>
  </div>
);

const gridEmployeeCountry = (props) => (
  <div className="flex items-center justify-center gap-2">
    <GrLocation />
    <span>{props.Country}</span>
  </div>
);

// Replace templates in employeesGrid with local ones
const fixedEmployeesGrid = employeesGrid.map((col) => {
  if (col.template === 'gridEmployeeProfile') {
    return { ...col, template: gridEmployeeProfile };
  }
  if (col.template === 'gridEmployeeCountry') {
    return { ...col, template: gridEmployeeCountry };
  }
  return col;
});

const Employees = () => {
  const toolbarOptions = ['Search'];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
      <GridComponent
        dataSource={employeesData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {fixedEmployeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};

export default Employees;
