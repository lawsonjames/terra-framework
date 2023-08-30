import React, { useState, useRef } from 'react';
import WorklistDataGrid from 'terra-worklist-data-grid';

const gridDataJSON = {
  cols: [
    { id: 'Column-0', displayName: 'Patient' },
    { id: 'Column-1', displayName: 'Location' },
    { id: 'Column-2', displayName: 'Illness Severity' },
    { id: 'Column-3', displayName: 'Visit' },
    { id: 'Column-4', displayName: 'Allergy' },
    { id: 'Column-5', displayName: 'Primary Contact' },
    { id: 'Column-6', displayName: 'Generic Order Counts' },
    { id: 'Column-7', displayName: 'Patient Age' },
    { id: 'Column-8', displayName: 'Medication History' },
    { id: 'Column-9', displayName: 'My Relationship' },
    { id: 'Column-10', displayName: 'Not Selectable', isSelectable: false },
  ],
  rows: [
    {
      id: '1',
      cells: [
        { content: 'Fleck, Arthur' },
        { content: '1007-MTN' },
        { content: 'Unstable' },
        { content: 'Inpatient, 2 months' },
        { content: '' },
        { content: 'Quinzell, Harleen' },
        { content: '' },
        { isMasked: true },
        { isMasked: true },
        { content: 'Admitting Physician' },
        { content: '', isSelectable: false },
      ],
    },
    {
      id: '2',
      cells: [
        { content: 'Wayne, Bruce' },
        { content: '1007-MTN-DR' },
        { content: 'Stable' },
        { content: 'Outpatient, 2 days' },
        { content: 'Phytochemicals' },
        { content: 'Grayson, Richard' },
        { content: '' },
        { content: '' },
        { isMasked: true },
        { content: 'Admitting Physician' },
        { content: '', isSelectable: false },
      ],
    },
  ],
};

const RowSelection = () => {
  const rowSelectionModeRef = useRef();
  const rowHeaderIndex = 0;
  const { cols, rows } = gridDataJSON;
  const [selectedRows, setSelectedRows] = useState([]);
  const [hasSelectableRows, setHasSelectableRows] = useState(true);

  const determineSelectedRows = (allRowsSelected, userSelectedRow) => {
    if (!userSelectedRow) {
      return [];
    }

    let remainingSelectedRow = [];
    if (allRowsSelected) {
      remainingSelectedRow = userSelectedRow;
    } else if (selectedRows.includes(userSelectedRow[0])) {
      // Row Deselected so remove this rowId.
      remainingSelectedRow = selectedRows.filter(row => (row !== userSelectedRow[0]));
    } else {
      // Row Selected so add this rowId.
      remainingSelectedRow = remainingSelectedRow.concat(selectedRows);
      remainingSelectedRow.push(userSelectedRow[0]);
    }
    return remainingSelectedRow;
  };

  const clearRowSelection = () => {
    // eslint-disable-next-line no-param-reassign
    rows.forEach(r => { if (r.isSelected) { r.isSelected = false; } });
    setSelectedRows([]);
  };

  const disableSelectableRows = () => {
    rowSelectionModeRef.current.checked = false;
    setHasSelectableRows(false);
    clearRowSelection();
  };

  return (
    <WorklistDataGrid
      id="pinned-columns-with-row-selection"
      pinnedColumns={cols.slice(0, 3)}
      overflowColumns={cols.slice(3)}
      rows={[...rows]}
      rowHeaderIndex={rowHeaderIndex}
      defaultColumnWidth={180}
      ariaLabel="Worklist Data Grid with Pinned Columns and Row Selection"
      hasSelectableRows={hasSelectableRows}
      onRowSelect={(rowsToSelectAndUnSelect) => {
        rowsToSelectAndUnSelect.forEach((changedRow) => {
          const dataRowToUpdate = rows.find(row => row.id === changedRow.id);
          if (dataRowToUpdate) {
            dataRowToUpdate.isSelected = changedRow.selected;
          }
        });
      }}
      onRowSelectAll={() => {
        const newRows = [];
        // eslint-disable-next-line no-param-reassign
        rows.forEach(row => { row.isSelected = true; newRows.push(row.id); });
        setSelectedRows(determineSelectedRows(true, newRows));
      }}
      onClearSelectedRows={() => {
        clearRowSelection();
      }}
      onDisableSelectableRows={() => {
        disableSelectableRows();
      }}
    />
  );
};

export default RowSelection;
