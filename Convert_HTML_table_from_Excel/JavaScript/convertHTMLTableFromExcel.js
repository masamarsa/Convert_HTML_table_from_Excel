window.addEventListener(
	'load',
	function () {
		changeTableSize();
		convertTable();
		styleTable();
		// _func();
		test();
	},
	false
);

const test = () => {

};

const _func = () => {
	const td_list = document.querySelectorAll('#table_edit tbody tr td');
	const row_length = document.getElementById('number_spinner_rows');
	const cell_length = document.getElementById('number_spinner_cells');
	let td_array = new Array(row_length);
	td_array.forEach(td => {
		td = new Array(cell_length);
	});
	for (let r = 0; r < row_length; r++) {
		for (let c = 0; c < cell_length; c++) {
			td_array[r][c] = td_list[row_length * (r + 1) + c];
		}
	}
};

/**
 * Function     : styleTable();
 * Description  : Style the table
 * Argument     : None
 * Return value : None
*/
const styleTable = () => {
	const table = document.getElementById('table_edit');
	const tbody = table.querySelector('tbody');
	const tr_list = tbody.querySelectorAll('tr');
	const td_list = tbody.querySelectorAll('tr td');
	td_list.forEach(td => {
		td.addEventListener('keydown', function () {
			const cell_number_1 = td.getAttribute('cell');
			td_list.forEach(td => {
				let cell_number_2 = td.getAttribute('cell');
				if (cell_number_1 == cell_number_2) {
					td.style.width = 'auto';
				}
			});
			td.style.width = 'auto';
		}, false);
	});
	document.getElementById('table_edit').onclick = function () {
		document.querySelectorAll('#table_edit').forEach(elm => {
			elm.contentEditable = true;
		});
	};
	// document.querySelectorAll('#table_edit tbody tr td').forEach(td => {
	// 	td.oninput = function () {
	// 		const array_td = [...td.innerHTML];
	// 		console.log(array_td.length);
	// 		if (array_td.length == 0) {
	// 			td.style.width = 'auto';
	// 		}
	// 	};
	// });
	let r = 0;
	let c = 0;
	document.getElementById('number_spinner_cells').onchange = function () {
		document.querySelectorAll('#table_edit tbody tr td').forEach(td => {
			td.setAttribute('row', r);
			td.setAttribute('cell', c);
			if (c < table.rows[0].cells.length - 1) {
				c++;
			} else {
				c = 0;
				r++;
			}
			const array_td = [...td.innerHTML];
			if (array_td.length == 0) {
				td.style.width = 'auto';
			}
		});
	};
};

/**
 * Function     : checkElementsInTable();
 * Description  : Check the elements of table
 * Argument     : None
 * Return value : None
 */
/**
 * @param {HTMLTableElement} table
 */
const checkElementsInTable = (table) => {
	for (let r = 0; r < table.rows.length; r++) {
		for (let c = 0; c < table.rows[r].cells.length; c++) {
			console.log(`[${r}, ${c}]: ${table.rows[r].cells[c].innerHTML}`);
		}
	}
};

/**
 * Function     : changeTableSize();
 * Description  : Change the size of table
 * Argument     : None
 * Return value : None
 */
const changeTableSize = () => {
	document.getElementById('number_spinner_rows').oninput = function () {
		const number_spinner_rows_value = parseInt(document.getElementById('number_spinner_rows').value);
		const table = document.getElementById('table_edit');
		const tbody = table.querySelector('tbody');
		if (table.rows.length < number_spinner_rows_value) {
			const roop_row_max = number_spinner_rows_value - table.rows.length;
			const roop_cell_max = table.rows[0].cells.length;
			for (let r = 0; r < roop_row_max; r++) {
				const new_tr = document.createElement('tr');
				for (let c = 0; c < roop_cell_max; c++) {
					const new_td = document.createElement('td');
					new_tr.appendChild(new_td);
				}
				tbody.appendChild(new_tr);
			}
		} else if (table.rows.length > number_spinner_rows_value) {
			const array_from_HTMLCollection = [...table.rows];
			const roop_row_max = number_spinner_rows_value;
			tbody.innerHTML = '';
			for (let r = 0; r < roop_row_max; r++) {
				tbody.appendChild(array_from_HTMLCollection[r]);
			}
		}
	};
	document.getElementById('number_spinner_cells').oninput = function () {
		const number_spinner_cells_value = parseInt(document.getElementById('number_spinner_cells').value);
		const table = document.getElementById('table_edit');
		const tbody = table.querySelector('tbody');
		const tr = tbody.querySelectorAll('tr');
		if (table.rows[0].cells.length < number_spinner_cells_value) {
			const roop_row_max = table.rows.length;
			const roop_cell_max = number_spinner_cells_value - table.rows[0].cells.length;
			for (let r = 0; r < roop_row_max; r++) {
				for (let c = 0; c < roop_cell_max; c++) {
					const new_td = document.createElement('td');
					tr[r].appendChild(new_td);
				}
				tbody.appendChild(tr[r]);
			}
		} else if (table.rows[0].cells.length > number_spinner_cells_value) {
			const roop_row_max = table.rows.length;
			const roop_cell_max = number_spinner_cells_value;
			for (let r = 0; r < roop_row_max; r++) {
				const array_from_HTMLCollection = [...table.rows[r].cells];
				tr[r].innerHTML = "";
				for (let c = 0; c < roop_cell_max; c++) {
					tr[r].appendChild(array_from_HTMLCollection[c]);
				}
			}
		}
	};
};

/**
 * Function     : convertTable();
 * Description  : Convert table to any format
 * Argument     : None
 * Return value : None
 */
const convertTable = () => {
	document.getElementById('csv_button').onclick = function () {
		let table = document.getElementById('table_edit');
		let csv = '';
		for (let r = 0; r < table.rows.length; r++) {
			for (let c = 0; c < table.rows[r].cells.length; c++) {
				if (c > 0) {
					csv += ',';
				}
				csv += table.rows[r].cells[c].textContent;
			}
			csv += '\n';
		}
		document.getElementById('data').textContent = csv;
	};
	document.getElementById('html_button').onclick = function () {
		let textarea_dataIn = document.querySelector('textarea#dataIn').value;
		let data_array = textarea_dataIn.split(/\n/);
		let html = '<table>\n<tbody>\n';
		for (let data of data_array) {
			html += '<tr>\n';
			data = data.split(/\t|\s/);
			for (const d of data) {
				if (d === '') continue;
				html += `<td>${d}</td>\n`;
			}
			html += '</tr>\n';
		}
		html += '</tbody>\n</table>';
		document.getElementById('dataOut').textContent = html;
	};
	document.getElementById('json_button').onclick = function () {
		let table = document.getElementById('table_edit');
		let rows = [];
		for (let r = 0; r < table.rows.length; r++) {
			let row = [];
			for (let c = 0; c < table.rows[r].cells.length; c++) {
				row[c] = table.rows[r].cells[c].textContent;
			}
			rows[r] = row;
		}
		document.getElementById('data').textContent = JSON.stringify(rows);
	};

};
