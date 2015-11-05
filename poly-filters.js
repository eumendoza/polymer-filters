(function(global) {

	var PolymerFilters = function() {};

	PolymerFilters.prototype = {
		/**
		 * Capitalize a string (transform its first letter to uppercase and the rest to lowercase)
		 * @param  {string} string
		 * @return {string} the capitalized string
		 */

		_capitalize: function(string) {
			string = string.toLowerCase();
			return string.charAt(0).toUpperCase() + string.slice(1);
		},

		/**
		 * Format a Number in Currency Format
		 * @param  {number} input
		 * @param  {string} currency - defaults to '$'
		 * @param  {integer} precision - defaults to 2
		 * @return {string}
		 */

		_currency: function(input, currency, precision) {

			if (isNaN(input)) {
				return "Value is not a Number";
			} else {
				currency = currency || "$";
				precision = precision || 2;

				input = Number(input);
				input = input.toFixed(precision);
			}

			var
				parts = input.split('.'),
				fnum = parts[0],
				decimal = parts[1] ? '.' + parts[1] : '';

			return currency + fnum.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + decimal;
		},

		/**
		 * Transform a supplied input date using a specified format
		 * @param  {date} input
		 * @param  {string} format
		 * @return {date}
		 */

		_date: function(input, format) {
			var date = new Date(input),
				day = date.getDate(),
				month = date.getMonth() + 1,
				year = date.getFullYear(),
				hours = date.getHours(),
				minutes = date.getMinutes(),
				seconds = date.getSeconds();

			if (!format) {
				format = "MM/dd/yyyy";
			}

			format = format.replace("MM", month.toString().replace(/^(\d)$/, '0$1'));

			if (format.indexOf("yyyy") > -1) {
				format = format.replace("yyyy", year.toString());
			} else if (format.indexOf("yy") > -1) {
				format = format.replace("yy", year.toString().substr(2, 2));
			}

			format = format.replace("dd", day.toString().replace(/^(\d)$/, '0$1'));

			if (format.indexOf("t") > -1) {
				if (hours > 11) {
					format = format.replace("t", "pm");
				} else {
					format = format.replace("t", "am");
				}
			}

			if (format.indexOf("HH") > -1) {
				format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
			}

			if (format.indexOf("hh") > -1) {
				if (hours > 12) {
					hours -= 12;
				}

				if (hours === 0) {
					hours = 12;
				}
				format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
			}

			if (format.indexOf("mm") > -1) {
				format = format.replace("mm", minutes.toString().replace(/^(\d)$/, '0$1'));
			}

			if (format.indexOf("ss") > -1) {
				format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
			}

			return format;
		},

		_first: function(arr) {
			return arr[0];
		},

		_last: function(arr) {
			return arr[arr.length - 1];
		},

		_length: function(arr) {
			return arr.length;
		},

		/**
		 * Limit displayed items from an array at an offset by a limit
		 *
		 * @param  {array} input
		 * @param  {integer} offset
		 * @param  {integer} limit
		 * @return {array}
		 */

		_limitFrom: function(input, offset, limit) {
			if (!(input instanceof Array) && !(input instanceof String)) return input;

			limit = parseInt(limit, 10);

			if (input instanceof String) {
				if (limit) {
					return limit >= 0 ? input.slice(offset, limit) : input.slice(limit, input.length);
				} else {
					return "";
				}
			}

			var out = [],
				i, n;

			if (limit > input.length)
				limit = input.length;
			else if (limit < -input.length)
				limit = -input.length;

			if (limit > 0) {
				i = offset;
				n = limit;
			} else {
				i = input.length + limit;
				n = input.length;
			}

			for (; i < n; i++) {
				out.push(input[i]);
			}

			return out;
		},

		/**
		 * Creates a new array or string containing only a specified
		 * number of elements. The elements are taken from either
		 * the beginning or the end of the source array or string,
		 * as specified by the value and sign (positive or negative) of `limit`
		 *
		 * Note: this is a straight-up port from the Angular limitTo filter
		 * and they deserve full credit for the implementation.
		 * @param  {Array|string} input input Source array or string to be limited.
		 * @param  {string|number} limit The length of the returned array or string. If the `limit` number
		 *     is positive, `limit` number of items from the beginning of the source array/string are copied.
		 *     If the number is negative, `limit` number  of items from the end of the source array/string
		 *     are copied. The `limit` will be trimmed if it exceeds `array.length`
		 * @return {Array|string} A new sub-array or substring of length `limit` or less if input array
		 *     had less than `limit` elements.
		 */

		_limitTo: function(input, limit) {

			function isArray(value) {
				return toString.call(value) === '[object Array]';
			}

			function isString(value) {
				return typeof value === 'string';
			}

			function int(str) {
				return parseInt(str, 10);
			}

			if (!isArray(input) && !isString(input)) return input;

			limit = int(limit);

			if (isString(input)) {
				//NaN check on limit
				if (limit) {
					return limit >= 0 ? input.slice(0, limit) : input.slice(limit, input.length);
				} else {
					return "";
				}
			}

			var out = [],
				i, n;

			// if abs(limit) exceeds maximum length, trim it
			if (limit > input.length)
				limit = input.length;
			else if (limit < -input.length)
				limit = -input.length;

			if (limit > 0) {
				i = 0;
				n = limit;
			} else {
				i = input.length + limit;
				n = input.length;
			}

			for (; i < n; i++) {
				out.push(input[i]);
			}

			return out;
		},

		/**
		 * Transform an array of strings into a readable list
		 * @param  {array} input
		 * @return {string} array elements delimited by a comma
		 */

		_list: function(input, space) {
			return input.join("," + (space || ""));
		},

		/**
		 * Transform an input string to lowercase
		 * @param  {string} input
		 * @return {string} lowercase string
		 */
		_lowercase: function(input) {
			return input.toLowerCase();
		},

		/**
		 * Left trim a string, removing leading whitespace
		 * @param  {string} input
		 * @return {string} left trimmed string
		 */
		_ltrim: function(input) {
			return input.replace(/^\s+/, '');
		},

		/**
		 * Transform an object into an array of its enumerable property names. If `obj`
		 * is null or undefined, it is returned unchanged.
		 * @param  {object} obj
		 * @return {array}
		 */
		_objectKeys: function(obj) {
			return obj === null ? obj : Object.keys(obj);
		},

		_orderBy: function(array, columnsToOrderBy, reverse) {
			if (!Array.isArray(array)) {
				return array;
			}
			if (!columnsToOrderBy) {
				return array;
			}
			if (typeof columnsToOrderBy === 'string') {
				columnsToOrderBy = [columnsToOrderBy];
			}

			// on a column-by-column basis, determine if descending order is desired
			var reverseSortValues = [];
			columnsToOrderBy.forEach(function(element, index) {
				if (element[0] == '-') {
					columnsToOrderBy[index] = element.substr(1);
					reverseSortValues.push(true);
				} else {
					reverseSortValues.push(false);
				}
			});

			// temporary holder of position and sort-values
			var map = array.map(function(element, index) {
				var sortValues = columnsToOrderBy.map(function(key) {
					if (typeof element[key] === 'string') {
						return element[key].toLowerCase();
					}

					return element[key];
				});

				return {
					index: index,
					sortValues: sortValues
				};
			});

			// sorting the map containing the reduced values
			map.sort(function(a, b) {
				var length = a.sortValues.length;

				for (var i = 0; i < length; i++) {
					if (reverseSortValues[i] === false) {
						if (a.sortValues[i] < b.sortValues[i])
							return -1;
						else if (a.sortValues[i] > b.sortValues[i])
							return 1;
					} else {
						if (a.sortValues[i] > b.sortValues[i])
							return -1;
						else if (a.sortValues[i] < b.sortValues[i])
							return 1;
					}
				}

				return 0;
			});

			if (reverse === true) {
				map.reverse();
			}

			// container for the resulting order
			var result = map.map(function(element) {
				return array[element.index];
			});

			return result;
		},

		/**
		 * Return a random item in a supplied array
		 * @param  {array} array
		 * @return {item}
		 */
		_random: function(array) {
			return array[Math.floor(Math.random() * array.length)];
		},

		_replace: function(str, old, new_, maxCount) {
			var res = str;
			var last = res;
			var count = 1;
			res = res.replace(old, new_);

			while (last != res) {
				if (count >= maxCount) {
					break;
				}

				last = res;
				res = res.replace(old, new_);
				count++;
			}

			return res;
		},

		/**
		 * Reverse a supplied value
		 * @param  {string} input
		 * @return {string} reversed string
		 */
		_reverse: function(input) {
			input = input || '';
			var out = "";
			for (var i = 0; i < input.length; i++) {
				out = input.charAt(i) + out;
			}
			return out;
		},

		/**
		 * Round a number by a specific precision or method
		 * @param  {integer} val
		 * @param  {integer} precision
		 * @param  {string} method
		 * @return {string}
		 */
		_round: function(val, precision, method) {
			precision = precision || 0;
			var factor = Math.pow(10, precision);
			var rounder;

			if (method == 'ceil') {
				rounder = Math.ceil;
			} else if (method == 'floor') {
				rounder = Math.floor;
			} else {
				rounder = Math.round;
			}

			return rounder(val * factor) / factor;
		},

		/**
		 * Right trim a string, removing trailing whitespace
		 * @param  {string} input
		 * @return {string} left trimmed string
		 */
		_rtrim: function(input) {
			return input.replace(/\s+$/, '');
		},

		/**
		 * Filter items that begin with a specific letter
		 * @param  {array} items
		 * @param  {string} letter
		 * @return {array}
		 */
		_startsWith: function(items, letter) {
			var filtered = [];
			var letterMatch = new RegExp(letter, 'i');
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if (letterMatch.test(item.name.substring(0, 1))) {
					filtered.push(item);
				}
			}
			return filtered;
		},

		/**
		 * Return a title-cased version of the input
		 * @param  {string} input
		 * @return {string}
		 */
		_titlecase: function(input) {
			var words = input.split(' ');
			for (var i = 0; i < words.length; i++) {
				var ret = words[i].toLowerCase();
				words[i] = ret.charAt(0).toUpperCase() + ret.slice(1);
			}
			return words.join(' ');
		},

		/**
		 * Trim a string, removing leading and trailing whitespace
		 * @param  {string} input
		 * @return {string} trimmed string
		 */
		_trim: function(input) {
			return input && input.replace(/^\s*|\s*$/g, '');
		},

		/**
		 * Return a truncated version of a string
		 * @param  {string} input
		 * @param  {integer} length
		 * @param  {boolean} killwords
		 * @param  {string} end
		 * @return {string}
		 */
		_truncate: function(input, length, killwords, end) {
			var orig = input;
			length = length || 255;
			if (!input) {
				return;
			}
			if (input.length <= length)
				return input;

			if (killwords) {
				input = input.substring(0, length);
			} else {
				var idx = input.lastIndexOf(' ', length);
				if (idx === -1) {
					idx = length;
				}

				input = input.substring(0, idx);
			}

			input += (end !== undefined && end !== null) ? end : '...';
			return input;
		},

		/**
		 * Returns the Type of an expression
		 * @param  {[any data type]} input
		 * @return {string}
		 *
		 *Thanks to: https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
		 */
		_typeof: function(input) {
			return ({}).toString.call(input).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
		},

		/**
		 * Return  Underscored `str`.
		 * @param  {string} str
		 * @return {string}
		 */
		_underscore: function(str) {
			return str.replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
		},

		/**
		 * Transform an input string to uppercase
		 * @param  {string} input
		 * @return {string} uppercase string
		 */
		_uppercase: function(input) {
			return input.toUpperCase();
		},

		/**
		 * Calculates word-count for a given string
		 * @param  {string} str
		 * @return {integer}
		 */
		_wordcount: function(input) {
			var words = (input) ? input.match(/\w+/g) : null;
			return (words) ? words.length : null;
		},

		/**
		 * Serializes input into a JSON-formatted string
		 * @param  {object} object
		 * @param  {number} spacing
		 * @return {string}
		 */
		_json: function(object, spacing) {

			function toJson(obj, pretty) {
				if (typeof obj === 'undefined') return undefined;
				if (isNaN(pretty)) {
					pretty = pretty ? 2 : null;
				}
				return JSON.stringify(obj, null, pretty);
			}

			if (typeof spacing === 'undefined') {
				spacing = 2;
			}
			
			return toJson(object, spacing);
		}
	};

	global.PolymerFilters = new PolymerFilters();

})(this);