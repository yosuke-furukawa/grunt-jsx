// generatedy by JSX compiler 0.9.65 (2013-09-10 22:05:42 +0900; 56dae7ea41e230ec1bfd940129342aa096ad35e1)
var JSX = {};
(function (JSX) {
/**
 * extends the class
 */
function $__jsx_extend(derivations, base) {
	var ctor = function () {};
	ctor.prototype = base.prototype;
	var proto = new ctor();
	for (var i in derivations) {
		derivations[i].prototype = proto;
	}
}

/**
 * copies the implementations from source interface to target
 */
function $__jsx_merge_interface(target, source) {
	for (var k in source.prototype)
		if (source.prototype.hasOwnProperty(k))
			target.prototype[k] = source.prototype[k];
}

/**
 * defers the initialization of the property
 */
function $__jsx_lazy_init(obj, prop, func) {
	function reset(obj, prop, value) {
		delete obj[prop];
		obj[prop] = value;
		return value;
	}

	Object.defineProperty(obj, prop, {
		get: function () {
			return reset(obj, prop, func());
		},
		set: function (v) {
			reset(obj, prop, v);
		},
		enumerable: true,
		configurable: true
	});
}

/**
 * sideeffect().a /= b
 */
function $__jsx_div_assign(obj, prop, divisor) {
	return obj[prop] = (obj[prop] / divisor) | 0;
}

/*
 * global functions, renamed to avoid conflict with local variable names
 */
var $__jsx_parseInt = parseInt;
var $__jsx_parseFloat = parseFloat;
function $__jsx_isNaN(n) { return n !== n; }
var $__jsx_isFinite = isFinite;

var $__jsx_encodeURIComponent = encodeURIComponent;
var $__jsx_decodeURIComponent = decodeURIComponent;
var $__jsx_encodeURI = encodeURI;
var $__jsx_decodeURI = decodeURI;

var $__jsx_ObjectToString = Object.prototype.toString;
var $__jsx_ObjectHasOwnProperty = Object.prototype.hasOwnProperty;

/*
 * profiler object, initialized afterwards
 */
function $__jsx_profiler() {
}

/*
 * public interface to JSX code
 */
JSX.require = function (path) {
	var m = $__jsx_classMap[path];
	return m !== undefined ? m : null;
};

JSX.profilerIsRunning = function () {
	return $__jsx_profiler.getResults != null;
};

JSX.getProfileResults = function () {
	return ($__jsx_profiler.getResults || function () { return {}; })();
};

JSX.postProfileResults = function (url, cb) {
	if ($__jsx_profiler.postResults == null)
		throw new Error("profiler has not been turned on");
	return $__jsx_profiler.postResults(url, cb);
};

JSX.resetProfileResults = function () {
	if ($__jsx_profiler.resetResults == null)
		throw new Error("profiler has not been turned on");
	return $__jsx_profiler.resetResults();
};
JSX.DEBUG = true;
function StopIteration() {
	var $__jsx_profiler_ctx = $__jsx_profiler.enter("StopIteration#constructor()");
	Error.call(this);
	this.name = "StopIteration";
	if (Error.captureStackTrace) Error.captureStackTrace(this, StopIteration);
	$__jsx_profiler.exit();
};

$__jsx_extend([StopIteration], Error);
function _Main() {
	var $__jsx_profiler_ctx = $__jsx_profiler.enter("_Main#constructor()");
	$__jsx_profiler.exit();
};

$__jsx_extend([_Main], Object);
function _Main$main$AS(args) {
	var $__jsx_profiler_ctx = $__jsx_profiler.enter("_Main.main(:Array.<string>)");
	var i;
	for (i = 1; i <= 100; ++ i) {
		if (i % 15 === 0) {
			console.log("FizzBuzz");
		} else if (i % 3 === 0) {
			console.log("Fizz");
		} else if (i % 5 === 0) {
			console.log("Buzz");
		} else {
			console.log(i);
		}
	}
	$__jsx_profiler.exit();
};

_Main.main = _Main$main$AS;
_Main.main$AS = _Main$main$AS;


var $__jsx_classMap = {
	"system:lib/built-in.jsx": {
		StopIteration: StopIteration,
		StopIteration$: StopIteration
	},
	"fixtures/fizzbuzz.jsx": {
		_Main: _Main,
		_Main$: _Main
	}
};


(function () {
	"use strict";

	var Profiler = $__jsx_profiler;

	var getTime;
	if (typeof(performance) != "undefined" && typeof(performance.now) == "function") {
		getTime  = function () { return performance.now() };
	}
	else {
		getTime  = function () { return Date.now() };
	}

	var stack = [ {
		$name: "<<root>>",
		$cur_exclusive: getTime()
	} ];

	Profiler.enter = function (name) {
		var t = getTime();
		var caller = stack[stack.length - 1];
		caller.$cur_exclusive -= t;
		var callee = caller[name];
		if (callee) {
			callee.$cur_inclusive = t;
			callee.$cur_exclusive = t;
		} else {
			callee = caller[name] = {
				$name: name,
				$cur_inclusive: t,
				$cur_exclusive: t,
				$inclusive: 0,
				$exclusive: 0,
				$count: 0
			};
		}
		stack.push(callee);
		return stack.length;
	};

	Profiler.exit = function (retval) {
		var t = getTime();
		var callee = stack.pop();
		++callee.$count;
		callee.$exclusive += t - callee.$cur_exclusive;
		callee.$inclusive += t - callee.$cur_inclusive;
		var caller = stack[stack.length - 1];
		caller.$cur_exclusive += t;
		return retval;
	};

	Profiler.resume = function (context) {
		while (context < stack.length) {
			Profiler.exit();
		}
	};

	Profiler.getResults = function () {
		return stack[0];
	};

	Profiler.postResults = function (url, cb) {
		if (! cb) {
			cb = function (error, message) {
				if (error) {
					console.error("Profiler: " + error.toString());
				}
				else {
					console.log("Profiler: " + message);
				}
			}
		}
		var content = JSON.stringify(Profiler.getResults(), function (k, v) {
			return typeof(v) === "number" ? Math.round(v) : v;
		});
		if (typeof(XMLHttpRequest) !== "undefined") {
			return this._postResultsXHR(url, content, cb);
		}
		if (typeof(require) !== "undefined" && require("http")) {
			return this._postResultsNode(url, content, cb);
		}
		cb(new ReferenceError("XMLHttpRequest is not defined"), null);
	};

	Profiler._postResultsXHR = function (url, content, cb) {
		// post target should support gist-style API
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status == 200 || xhr.status == 201 || xhr.status == 0) {
					cb(null, xhr.getResponseHeader("Location") || xhr.responseText);
				} else {
					cb(new Error("failed to post profiler results, received " + xhr.status + " " + xhr.statusText + " response from server"), null);
				}
			}
		};
		xhr.onerror = function (event) {
			cb(new Error("failed to post profiler results"), null);
		};
		xhr.open("POST", url, /* async: */true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(content);
	};

	Profiler._postResultsNode = function (url, content, cb) {
		var http = require("http");
		url = require("url").parse(url);
		var req = http.request({
			method: "POST",
			hostname: url.hostname,
			port: url.port,
			path: url.path,
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(content, "utf8"),
			},
		}, function (res) {
			res.setEncoding("utf8");
			var data = "";
			res.on("data", function (chunk) {
				data += chunk;
			});
			res.on("end", function () {
				if (res.statusCode == 200 || res.statusCode == 201) {
					cb(null, res.headers.location || data);
				} else {
					cb(new Error("failed to post profiler results, received " + res.statusCode + " response from server"), null);
				}
			});
		}).on('error', function (e) {
			cb(e, null);
		});
		req.write(content, "utf8");
		req.end();
	};

	Profiler.resetResults = function () {
		var t = getTime();
		for (var stackIndex = 0; stackIndex < stack.length; ++stackIndex) {
			var isLeaf = stackIndex == stack.length - 1;
			// reset the counters
			stack[stackIndex].$cur_inclusive = t;
			stack[stackIndex].$cur_exclusive = isLeaf ? t : 0;
			stack[stackIndex].$inclusive = 0;
			stack[stackIndex].$exclusive = 0;
			stack[stackIndex].$count = 0;
			// reset callees
			for (var k in stack[stackIndex]) {
				if (k.charAt(0) != "$") {
					if (! isLeaf && stack[stackIndex][k] == stack[stackIndex + 1]) {
						// preserve the current call path
					} else {
						delete stack[stackIndex][k];
					}
				}
			}
		}
	};

})();
})(JSX);
