import React, {
  useState, useContext, useRef, useCallback, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';
import * as KeyCode from 'keycode-js';
import classNames from 'classnames/bind';
import ResizeObserver from 'resize-observer-polyfill';
import ThemeContext from 'terra-theme-context';
import VisuallyHiddenText from 'terra-visually-hidden-text';
import Section from './subcomponents/Section';
import ColumnHeader from './subcomponents/ColumnHeader';
import ColumnContext from './utils/ColumnContext';
import columnShape from './proptypes/columnShape';
import GridContext, { GridConstants } from './utils/GridContext';
import rowShape from './proptypes/rowShape';
import validateRowHeaderIndex from './proptypes/validators';

import styles from './Table.module.scss';
import sectionShape from './proptypes/sectionShape';
import getFocusableElements from './utils/focusManagement';

const cx = classNames.bind(styles);

const RowSelectionModes = {
  SINGLE: 'single',
  MULTIPLE: 'multiple',
};

const TableConstants = {
  ROW_SELECTION_COLUMN_WIDTH: 40,
  TABLE_MARGIN_RIGHT: 15,
};

const ROW_SELECTION_COLUMN_ID = 'table-rowSelectionColumn';

const propTypes = {
  /**
   * An identifier to uniquely identify the table.
   */
  id: PropTypes.string.isRequired,

  /**
  * The information for content in the body of the table when sections do not exist. Rows are rendered in the order given.
  * The sections property has precedence over this property.
  */
  rows: PropTypes.arrayOf(rowShape),

  /**
  * The information for content in the body of the table. Sections are rendered in the order given.
  */
  sections: PropTypes.arrayOf(sectionShape),

  /**
   * A string that identifies the element (or elements) that labels the table.
   */
  ariaLabelledBy: PropTypes.string,

  /**
   * A string that labels the table for accessibility. If the ariaLabelledBy property is specified, the ariaLabel property is not used.
   */
  ariaLabel: PropTypes.string,

  /**
   * @private
   * Column index for cell that can receive tab focus.
   */
  activeColumnIndex: PropTypes.number,
  /**
   * @private
   * Specifies if resize handle should be active.
   */
  isActiveColumnResizing: PropTypes.bool,

  /**
   * A numeric increment in pixels to adjust column width when resizing with the keyboard.
   */
  columnResizeIncrement: PropTypes.number,

  /**
   * The information for pinned columns. Pinned columns are the stickied leftmost columns of the table.
   * Columns are presented in the order given.
   */
  pinnedColumns: PropTypes.arrayOf(columnShape),

  /**
   * The information for overflow columns. Overflow columns are rendered in the table's horizontal overflow.
   * Columns are presented in the order given.
   */
  overflowColumns: PropTypes.arrayOf(columnShape),

  /**
   * A number indicating the default column width in pixels. This value is used if no overriding width value is provided on a per-column basis.
   */
  defaultColumnWidth: PropTypes.number,

  /**
   * A string that specifies the column height. Any valid CSS height value is accepted.
   */
  columnHeaderHeight: PropTypes.string,

  /**
   * A string that specifies the height for the rows on the table. Any valid CSS value is accepted.
   */
  rowHeight: PropTypes.string,

  /**
   * A string that specifies the Minimum height for the rows on the table. rowHeight takes precedence if valid CSS value is passed.
   * With this property the height of the cell will grow to fit the cell content.
   */
  rowMinimumHeight: PropTypes.string,

  /**
   * A number indicating the index of the column that represents the row header. The index is based on 0 and cannot exceed one less than the number of columns on the table.
   */
  rowHeaderIndex: validateRowHeaderIndex,

  /**
   * A function that is called when a resizable column is resized. Parameters:
   * @param {string} columnId columnId
   * @param {string} requestedWidth requestedWidth
   */
  onColumnResize: PropTypes.func,

  /**
   * A callback function that is called when a selectable cell is selected. Parameters:
   * @private
   * @param {string} rowId rowId
   * @param {string} columnId columnId
   */
  onCellSelect: PropTypes.func,

  /**
   * A callback function that is called when one or more rows are selected or cleared. Parameters:
   * @param {string} rowId row id of the selected row
   */
  onRowSelect: PropTypes.func,

  /**
   * A callback function that is called when a selectable column is selected. Parameters:
   *  @param {string} columnId columnId
   */
  onColumnSelect: PropTypes.func,

  /**
   * A function that is called when a collapsible section is selected. Parameters: `onSectionSelect(sectionId)`
   */
  onSectionSelect: PropTypes.func,

  /*
   * A callback function that is called when the row selection column header is selected. Parameters:
   *  @param {string} columnId columnId
   */
  onRowSelectionHeaderSelect: PropTypes.func,

  /**
   * A mode that enables row selection capabilities for the table.
   * Use 'single' for single row selection and 'multiple' for multi-row selection.
   */
  rowSelectionMode: PropTypes.oneOf(Object.values(RowSelectionModes)),

  /**
   * A Boolean value indicating whether the table columns are displayed. Setting the value to **false** hides the columns,
   * but a screen reader still reads the column header values for accessibility.
   */
  hasVisibleColumnHeaders: PropTypes.bool,

  /**
   * A Boolean value specifying whether the table has zebra striping for rows.
   */
  isStriped: PropTypes.bool,

  /**
   * @private
   * The intl object containing translations. This is retrieved from the context automatically by injectIntl.
   */
  intl: PropTypes.shape({ formatMessage: PropTypes.func }).isRequired,
};

const defaultProps = {
  rowHeaderIndex: 0,
  defaultColumnWidth: 200,
  columnHeaderHeight: '2.5rem',
  rowMinimumHeight: '2.5rem',
  pinnedColumns: [],
  overflowColumns: [],
  rows: [],
  hasVisibleColumnHeaders: true,
};

const defaultColumnMinimumWidth = 60;
const defaultColumnMaximumWidth = 300;

function Table(props) {
  const {
    id,
    ariaLabelledBy,
    ariaLabel,
    activeColumnIndex,
    isActiveColumnResizing,
    columnResizeIncrement,
    rows,
    sections,
    pinnedColumns,
    overflowColumns,
    onColumnResize,
    defaultColumnWidth,
    columnHeaderHeight,
    rowHeight,
    rowSelectionMode,
    onColumnSelect,
    onCellSelect,
    onSectionSelect,
    onRowSelect,
    onRowSelectionHeaderSelect,
    hasVisibleColumnHeaders,
    isStriped,
    rowHeaderIndex,
    intl,
    rowMinimumHeight,
  } = props;

  // Manage column resize
  const [tableHeight, setTableHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const activeColumnPageX = useRef(0);
  const activeColumnWidth = useRef(200);
  const tableWidth = useRef(0);

  const [pinnedColumnOffsets, setPinnedColumnOffsets] = useState([0]);

  const tableContainerRef = useRef();
  const tableRef = useRef();
  const [isTableScrollable, setTableScrollable] = useState(false);

  const theme = useContext(ThemeContext);

  const gridContext = useContext(GridContext);
  const isGridContext = gridContext.role === GridConstants.GRID;

  const rowSelectionEffectTriggered = useRef(false);
  const selectedRows = useRef([]);
  const [rowSelectionAriaLiveMessage, setRowSelectionAriaLiveMessage] = useState(null);
  const [rowSelectionModeAriaLiveMessage, setRowSelectionModeAriaLiveMessage] = useState(null);

  // Aria live region message management
  const [columnHeaderAriaLiveMessage, setColumnHeaderAriaLiveMessage] = useState(null);

  const columnContextValue = useMemo(() => ({ pinnedColumnOffsets, setColumnHeaderAriaLiveMessage }), [pinnedColumnOffsets]);

  // Initialize column width properties
  const initializeColumn = (column) => ({
    ...column,
    width: column.width || defaultColumnWidth,
    minimumWidth: column.minimumWidth || defaultColumnMinimumWidth,
    maximumWidth: column.maximumWidth || defaultColumnMaximumWidth,
  });

  const hasSelectableRows = rowSelectionMode === RowSelectionModes.MULTIPLE;
  const displayedColumns = useMemo(() => {
    // Create row selection column object
    const tableRowSelectionColumn = {
      id: ROW_SELECTION_COLUMN_ID,
      width: TableConstants.ROW_SELECTION_COLUMN_WIDTH,
      displayName: intl.formatMessage({ id: 'Terra.table.row-selection-header-display' }),
      isDisplayVisible: false,
      isSelectable: !!onRowSelectionHeaderSelect,
      isResizable: false,
    };

    return (hasSelectableRows ? [tableRowSelectionColumn] : []).concat(pinnedColumns).concat(overflowColumns);
  }, [hasSelectableRows, intl, onRowSelectionHeaderSelect, overflowColumns, pinnedColumns]);

  const [tableColumns, setTableColumns] = useState(displayedColumns.map((column) => initializeColumn(column)));

  const defaultSectionRef = useRef(uuidv4());

  // Create section array from props
  const tableSections = useMemo(() => {
    if (sections) {
      return [...sections];
    }

    return [{ id: defaultSectionRef.current, rows }];
  }, [rows, sections]);

  // Calculate total table row count
  const tableSectionReducer = (rowCount, currentSection) => {
    if (currentSection.id !== defaultSectionRef.current) {
      // eslint-disable-next-line no-param-reassign
      currentSection.sectionRowIndex = rowCount + 1;
      return rowCount + currentSection.rows.length + 1;
    }

    // eslint-disable-next-line no-param-reassign
    currentSection.sectionRowIndex = rowCount;
    return rowCount + currentSection.rows.length;
  };
  const tableRowCount = tableSections.reduce(tableSectionReducer, 1);

  // -------------------------------------
  // functions

  const handleCellSelection = useCallback((selectionDetails) => {
    if (!isGridContext && onRowSelect) {
      onRowSelect({ sectionId: selectionDetails.sectionId, rowId: selectionDetails.rowId });
      return;
    }

    if (onCellSelect) {
      onCellSelect(selectionDetails);
    }
  }, [isGridContext, onCellSelect, onRowSelect]);

  // -------------------------------------
  // useEffect Hooks

  useEffect(() => {
    if (!rowSelectionEffectTriggered.current) {
      rowSelectionEffectTriggered.current = true;
      return;
    }

    // Since the row selection mode has changed, the row selection mode needs to be updated.
    setRowSelectionModeAriaLiveMessage(intl.formatMessage({ id: rowSelectionMode === RowSelectionModes.MULTIPLE ? 'Terra.table.row-selection-mode-enabled' : 'Terra.table.row-selection-mode-disabled' }));

    setTableColumns(displayedColumns.map((column) => initializeColumn(column)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelectionMode]);

  // useEffect for row updates
  useEffect(() => {
    const previousSelectedRows = [...selectedRows.current];
    const selectableRows = tableSections.flatMap(section => (section.rows.map(row => (row))));
    selectedRows.current = selectableRows.filter((row) => row.isSelected).map(row => (row.id));

    if (previousSelectedRows.length > 0 && selectedRows.current.length === 0) {
      setRowSelectionAriaLiveMessage(intl.formatMessage({ id: 'Terra.table.all-rows-unselected' }));
    } else if (selectedRows.current.length === selectableRows.length) {
      setRowSelectionAriaLiveMessage(intl.formatMessage({ id: 'Terra.table.all-rows-selected' }));
    } else {
      const rowSelectionsAdded = selectedRows.current.filter(row => !previousSelectedRows.includes(row));
      const rowSelectionsRemoved = previousSelectedRows.filter(row => !selectedRows.current.includes(row));
      let selectionUpdateAriaMessage = '';

      if (rowSelectionsAdded.length === 1) {
        const selectedRowLabel = tableRef.current.querySelector(`tr[data-row-id='${rowSelectionsAdded[0]}']`).getAttribute('aria-rowindex');
        selectionUpdateAriaMessage = intl.formatMessage({ id: 'Terra.table.row-selection-template' }, { row: selectedRowLabel });
      } else if (rowSelectionsAdded.length > 1) {
        selectionUpdateAriaMessage = intl.formatMessage({ id: 'Terra.table.multiple-rows-selected' }, { rowCount: rowSelectionsAdded.length });
      }

      if (rowSelectionsRemoved.length === 1) {
        const unselectedRowLabel = tableRef.current.querySelector(`tr[data-row-id='${rowSelectionsRemoved[0]}']`).getAttribute('aria-rowindex');
        selectionUpdateAriaMessage += intl.formatMessage({ id: 'Terra.table.row-selection-cleared-template' }, { row: unselectedRowLabel });
      } else if (rowSelectionsRemoved.length > 1) {
        selectionUpdateAriaMessage += intl.formatMessage({ id: 'Terra.table.multiple-rows-unselected' }, { rowCount: rowSelectionsRemoved.length });
      }

      if (selectionUpdateAriaMessage) {
        setRowSelectionAriaLiveMessage(selectionUpdateAriaMessage);
      }
    }
  }, [intl, tableSections]);

  // useEffect for row displayed columns
  useEffect(() => {
    setTableColumns(displayedColumns.map((column) => initializeColumn(column)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinnedColumns, overflowColumns]);

  // useEffect to calculate pinned column offsets
  useEffect(() => {
    const offsetArray = [];
    let cumulativeOffset = 0;
    let lastPinnedColumnIndex;

    // if table has selectable rows but no pinned columns, then set the offset of the first column to 0
    if (hasSelectableRows && pinnedColumns.length === 0) {
      lastPinnedColumnIndex = 0;
      offsetArray.push(cumulativeOffset);
      setPinnedColumnOffsets(offsetArray);
      return;
    }

    if (pinnedColumns.length > 0) {
      offsetArray.push(cumulativeOffset);

      lastPinnedColumnIndex = hasSelectableRows ? pinnedColumns.length : pinnedColumns.length - 1;

      tableColumns.slice(0, lastPinnedColumnIndex).forEach((pinnedColumn) => {
        cumulativeOffset += pinnedColumn.width;
        offsetArray.push(cumulativeOffset);
      });
    }
    setPinnedColumnOffsets(offsetArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableColumns]);

  // useEffect for managing the table height.
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setTableHeight(tableRef.current.offsetHeight - 1);

      const tableContainer = tableContainerRef.current;
      setTableScrollable(tableContainer.scrollWidth > tableContainer.clientWidth
                        || tableContainer.scrollHeight > tableContainer.clientHeight);
    });

    resizeObserver.observe(tableRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [tableRef]);

  // -------------------------------------

  const handleTableRef = useCallback((node) => {
    if (gridContext.tableRef) {
      gridContext.tableRef.current = node;
    }
    tableRef.current = node;
  }, [gridContext.tableRef]);

  const handleContainerRef = useCallback((node) => {
    if (gridContext.tableContainerRef) {
      gridContext.tableContainerRef.current = node;
    }
    tableContainerRef.current = node;
  }, [gridContext.tableContainerRef]);

  // -------------------------------------
  // event handlers

  const handleColumnSelect = useCallback((columnId) => {
    if (columnId === ROW_SELECTION_COLUMN_ID) {
      if (onRowSelectionHeaderSelect) {
        onRowSelectionHeaderSelect();
      }
    } else if (onColumnSelect) {
      onColumnSelect(columnId);
    }
  }, [onColumnSelect, onRowSelectionHeaderSelect]);

  const onResizeMouseDown = useCallback((event, index, resizeColumnWidth) => {
    // Store current table and column values for resize calculations
    tableWidth.current = tableRef.current.offsetWidth;
    activeColumnPageX.current = event.pageX;
    activeColumnWidth.current = resizeColumnWidth;

    // Set the active index to the selected column
    setActiveIndex(index);
  }, []);

  const onMouseMove = (event) => {
    if (activeIndex == null) {
      return;
    }

    // Ensure the new column width falls within the range of the minimum and maximum values
    const diffX = event.pageX - activeColumnPageX.current;
    const { minimumWidth, maximumWidth } = tableColumns[activeIndex];
    const newColumnWidth = Math.min(Math.max(activeColumnWidth.current + diffX, minimumWidth), maximumWidth);

    // Update the width for the column in the state variable
    const newColumns = [...tableColumns];
    newColumns[activeIndex].width = newColumnWidth;
    setTableColumns(newColumns);

    // Update the column and table width
    tableRef.current.style.width = `${tableWidth + (newColumnWidth - activeColumnWidth.current)}px`;
  };

  const onMouseUp = () => {
    if (onColumnResize) {
      onColumnResize(tableColumns[activeIndex].id, tableColumns[activeIndex].width);
    }
    // Remove active index
    setActiveIndex(null);
  };

  const onResizeHandleChange = useCallback((columnIndex, increment) => {
    const { minimumWidth, maximumWidth, width } = tableColumns[columnIndex];
    const newColumnWidth = Math.min(Math.max(width + increment, minimumWidth), maximumWidth);

    // Update the width for the column in the state variable
    const newGridColumns = [...tableColumns];
    newGridColumns[columnIndex].width = newColumnWidth;
    setTableColumns(newGridColumns);

    // Update the column and table width
    tableRef.current.style.width = `${tableRef.current.offsetWidth + (newColumnWidth - width)}px`;

    // Notify consumers of the new column width
    if (onColumnResize) {
      onColumnResize(tableColumns[columnIndex].id, tableColumns[columnIndex].width);
    }
  }, [tableColumns, onColumnResize]);

  /**
   *
   * @param {HTMLElement} element - The element to check if it is a text input
   * @returns True if the element is a text input.  Otherwise, false.
   */
  const isTextInput = (element) => {
    const { tagName } = element;
    if (tagName.toLowerCase() === 'input') {
      const validTypes = ['text', 'password', 'number', 'email', 'tel', 'url', 'search', 'date', 'datetime', 'datetime-local', 'time', 'month', 'week'];
      const inputType = element.type;
      return validTypes.indexOf(inputType) >= 0;
    }

    return false;
  };

  const onKeyDown = (event) => {
    const targetElement = event.target;

    // Allow default behavior if the event target is an editable field
    if (event.keyCode !== KeyCode.KEY_TAB
        && (isTextInput(targetElement)
            || ['textarea', 'select'].indexOf(targetElement.tagName.toLowerCase()) >= 0
            || (targetElement.hasAttribute('contentEditable') && targetElement.getAttribute('contentEditable') !== false))) {
      return;
    }

    // Handle home and end key navigation in table
    let focusableTableElements;
    if (event.keyCode === KeyCode.KEY_HOME) {
      focusableTableElements = getFocusableElements(tableRef.current);
      if (focusableTableElements) {
        focusableTableElements[0].focus();
      }
    } else if (event.keyCode === KeyCode.KEY_END) {
      focusableTableElements = getFocusableElements(tableRef.current);
      if (focusableTableElements) {
        focusableTableElements[focusableTableElements.length - 1].focus();
      }
    }
  };

  // Added margin to allow for resizing of last column.
  const hasResizableCol = tableColumns[tableColumns.length - 1].isResizable;
  const tableStyle = {
    marginRight: hasResizableCol ? `${TableConstants.TABLE_MARGIN_RIGHT}px` : '0',
  };

  // -------------------------------------

  return (
    <div
      ref={handleContainerRef}
      className={cx('table-container', theme.className)}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={!isGridContext && isTableScrollable ? 0 : undefined}
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <table
        ref={handleTableRef}
        id={id}
        role={gridContext.role}
        aria-labelledby={ariaLabelledBy}
        aria-label={ariaLabel}
        aria-rowcount={tableRowCount}
        style={tableStyle} // eslint-disable-line react/forbid-dom-props
        className={cx('table', { headerless: !hasVisibleColumnHeaders })}
        onKeyDown={!isGridContext ? onKeyDown : undefined}
        {...(activeIndex != null && { onMouseUp, onMouseMove, onMouseLeave: onMouseUp })}
      >
        <ColumnContext.Provider
          value={columnContextValue}
        >
          <colgroup>
            {tableColumns.map((column) => (
              // eslint-disable-next-line react/forbid-dom-props
              <col key={column.id} style={{ width: `${column.width}px` }} />
            ))}
          </colgroup>

          <ColumnHeader
            tableId={id}
            isActiveColumnResizing={isActiveColumnResizing}
            activeColumnIndex={activeColumnIndex}
            columns={tableColumns}
            hasVisibleColumnHeaders={hasVisibleColumnHeaders}
            headerHeight={columnHeaderHeight}
            columnResizeIncrement={columnResizeIncrement}
            tableHeight={tableHeight}
            onResizeMouseDown={onResizeMouseDown}
            onColumnSelect={handleColumnSelect}
            onResizeHandleChange={onResizeHandleChange}
          />
          {tableSections.map((section) => (
            <Section
              id={section.id}
              tableId={id}
              key={section.id}
              sectionRowIndex={section.sectionRowIndex}
              isCollapsible={section.isCollapsible}
              isCollapsed={section.isCollapsed}
              isHidden={section.id === defaultSectionRef.current}
              isTableStriped={isStriped}
              text={section.text}
              rows={section.rows}
              rowHeight={rowHeight}
              rowSelectionMode={rowSelectionMode}
              displayedColumns={displayedColumns}
              rowHeaderIndex={rowHeaderIndex}
              onCellSelect={isGridContext || rowSelectionMode ? handleCellSelection : undefined}
              onSectionSelect={onSectionSelect}
              rowMinimumHeight={rowMinimumHeight}
            />
          ))}
        </ColumnContext.Provider>
      </table>
      <VisuallyHiddenText className={cx('row-selection-mode-region')} aria-live="polite" text={rowSelectionModeAriaLiveMessage} />
      <VisuallyHiddenText className={cx('row-selection-region')} aria-live="polite" text={rowSelectionAriaLiveMessage} />
      <VisuallyHiddenText className={cx('column-header-region')} aria-live="polite" aria-atomic="true" text={columnHeaderAriaLiveMessage} />
    </div>
  );
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default React.memo(injectIntl(Table));
export { TableConstants, RowSelectionModes };
