(function() {
	Anim.prototype._evalFunc = function evalFunc(s, targets) {
		eval('var f=function(){' + s + '}');
		return f;
	};
})();

(function($, undefined) {
	var AnimProto = Anim.prototype;

	AnimProto.target = function(newTarget) {
		this._targets[ this._targets.length ] = newTarget;
		return this;
	};

	AnimProto._funcStr = '';

	function buildValueCalculator(from, to, max, min, round) {
		// start with (from + (from - to) * this.value)
		var str = '(' + Number(from) + '+' + (to - from) + '*this.value)';
		
		// wrap in functions to keep values within range / round values if needed
		if (min !== undefined) {
			str = 'Math.max(' + str + ', ' + min + ')';
		}
		if (max !== undefined) {
			str = 'Math.min(' + str + ', ' + max + ')';
		}
		if (round) {
			str = 'Math.round(' + str + ')';
		}
		
		return str;
	}

	function compileTemplate(template, from, to, max, min, round) {
		// no template? That's easy.
		if (!template) {
			return buildValueCalculator(from, to, max, min, round);
		}
		
		var templateParts = template.split('?'),
			templatePart,
			str = '"' + templateParts[0].replace(/"/g, '\\"') + '"',
			// discover which values are arrays
			Array = window.Array,
			fromIsArray = from.constructor === Array,
			toIsArray = to.constructor === Array,
			maxIsArray = max !== undefined && max.constructor === Array,
			minIsArray = min !== undefined && min.constructor === Array,
			roundIsArray = round.constructor === Array,
			iMinusOne = 0;
		
		for (var i = 1, leni = templateParts.length; i < leni; i++, iMinusOne++) {
			templatePart = templateParts[i];
			
			if ( templateParts[iMinusOne].slice(-1) === '\\' ) {
				// the user wants a literal question mark, put it back
				str += '+"?"';
			}
			else {
				// remove trailing slash, it's being used to escape a ?
				if ( templatePart.slice(-1) === '\\' ) {
					templatePart = templatePart.slice(0, -1);
				}
				str += '+' +
					buildValueCalculator(
						fromIsArray ? from[iMinusOne] : from,
						toIsArray ? to[iMinusOne] : to,
						maxIsArray ? max[iMinusOne] : max,
						minIsArray ? min[iMinusOne] : min,
						roundIsArray ? round[iMinusOne] : round
					) +
					'+"' + templatePart.replace(/"/g, '\\"') + '"';
			}
		}
		return str;
	}

	function buildFunction(anim, targetIndex, propName, conf) {
		var targets = anim._targets,
			// this is going to be our listener for the frame event
			functionStr = anim._funcStr,
			func;
		
		functionStr += 'var target=targets[' + targetIndex + '];' +
			'target["' + propName.replace(/"/g, '\\"') + '"]=' +
			compileTemplate(conf.template, conf.from, conf.to, conf.max, conf.min, conf.round) +
			';';
		
		// retain new function string
		anim._funcStr = functionStr;
		
		// eval to create a single function to be called
		func = anim._evalFunc(functionStr, targets);
		
		// remove old listener & add new one
		anim.detach('frame', anim._propFunc).on('frame', func);
		// retain new func so we can remove it later
		anim._propFunc = func;
		func = functionStr = undefined;
	}

	AnimProto.prop = function(propName, conf) {
		var targetIndex = this._targets.length - 1,
			target = this._targets[targetIndex];
		
		// default conf
		conf = $.extend({
			from: getFromVals(target[propName], conf),
			round: false
		}, conf);
		
		buildFunction(this, targetIndex, propName, conf);
		
		return this;
	};
})(jQuery);