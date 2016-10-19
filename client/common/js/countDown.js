/*倒计时*/
module.exports ={
	countDown:function(options){
		var aproto = Array.prototype,
			aslice = aproto.slice,
			otoString = Object.prototype.toString;
		var options=options||{};

		var typeset = {};

		var type = function(o){
			if(o === undefined) return 'undefined';
			if(o === null) return 'null';
			var t = otoString.call(o);
			if(typeset[t]) return typeset[t];
			var tv = t.replace(/^\[object\s+|\]$/g,'').toLowerCase();
			return typeset[t] = tv;
		};


		var each = function(l,fn,space,reverse){
			var t = type(l),i,e;
			if(t === 'array' || t === 'arguments' || l.length){
				if(reverse){
					for(i=l.length-1;i>-1;i--){
						if(fn.call(space,l[i],i,l)) return;
					}
				}else{
					for(i=0,e=l.length;i<e;i++){
						if(fn.call(space,l[i],i,l)) return;
					}
				}
			}else{
				for(i in l){
					if(l.hasOwnProperty(i) && fn.call(space,l[i],i,l)) return;
				}
			}
		}


		var indexOf = function(arr,o){
			var index = -1;
			var eq = function(v){ return v === o};
			if(typeof o === 'function') eq = o;
			each(arr||[],function(v,i){
				if(eq(v)){
					index = i;
					return true;
				}
			});
			return index;
		}

		function loop(time,step,target){
			
		}

		var CountDown = function(){
			this.initialize.apply(this,arguments);
		}

		CountDown.prototype = {
			on:function(type,fn,space,override){
				var e = this.__event;
				e[type] = e[type] || [];
				if(!override || indexOf(e[type],function(v){ return fn === v.fn;}) === -1){
					e[type].push({fn:fn,space:space});
				}
			},
			one:function(type,fn,space,override){
				var self = this;
				var oFn = function(){
					fn.apply(self, arguments);
					self.off(type, oFn);
				};
				self.on(type,oFn,space,override)
			},
			off:function(type,fn){
				if(!type && !fn){
					this.__event = {};
					return ;
				}
				var e = this.__event,index;
				e[type] = e[type] || [];
				if(fn){
					index = Base.indexOf(e[type],function(v){ return fn === v.fn;});
					if(index > -1){
						e[type].splice(index,1);
					}
				}else{
					e[type] = [];
				}
			},
			emit:function(type){
				var e = this.__event,index,self = this;
				e[type] = e[type] || [];
				var args = [].slice.call(arguments);
				args.shift();
				each(e[type],function(o){
					o.fn.apply(o.space || self,args);
				});
			},


			propertys:function(){
				this.time = 8;
				this.step = 1;
				this.target = 0;
				this.__event = {};

				this.status = CountDown.STATUS_STOP;
			},
			initialize:function(options){
				this.propertys();
				this.setOption(options);
			},
			setOption:function(options){
				if(typeof options.time === 'number'){
					this.time = options.time;
				}
				if(typeof options.step === 'number'){
					this.step = options.step;
				}
				if(typeof options.target === 'number'){
					this.target = options.target;
				}
				if(!options.serverTime){
					options.serverTime = +new Date();
				}
				if(typeof options.serverTime === 'number'){
					this.serverTime = options.serverTime;
					this.curTime = +new Date();
					this.diffTime = this.curTime - this.serverTime;
				}
				if(!options.endTime){
					options.endTime = this.serverTime + 1000;
				}
				if(typeof options.endTime === 'number'){
					this.endTime = options.endTime;
					this.time = parseInt((this.endTime - (+new Date()) + this.diffTime) / 1000);
					this.target = 0;
				}
				if(typeof options.onChange === 'function'){
					this.on('onChange',options.onChange);
				}
				if(typeof options.onStart === 'function'){
					this.on('onStart',options.onStart);
				}
				if(typeof options.onPause === 'function'){
					this.on('onPause',options.onPause);
				}
				if(typeof options.onEnd === 'function'){
					this.on('onEnd',options.onEnd);
				}
			},
			start:function(){
				if(this.status === CountDown.STATUS_PAUSE){
					this._time -= this.step;;
				}else{
					this._time = this.time;
					this.emit('onStart',this.time);
				}
				this.status = CountDown.STATUS_RUNNING;
				this._loop();
			},
			pause:function(){
				this.status = CountDown.STATUS_PAUSE;
			},
			stop:function(){
				this.status = CountDown.STATUS_STOP;
			},
			_loop:function(){
				var self = this;
				var time = this._time;
				this.emit('onChange',time);
				if(this.status === CountDown.STATUS_PAUSE){
					this.emit('onPause',time);
					return;
				}

				if(this._checkTime() || this.status === CountDown.STATUS_STOP){
					this.emit('onEnd',time);
					return;
				}

				setTimeout(function(){
					self._time -= self.step;
					self._loop();
				},self.step*1000);
			},
			_checkTime:function(){
				if(this.endTime && this.serverTime){
					this._time = parseInt((this.endTime - (+new Date()) + this.diffTime) / 1000);
				}
				return this._time <= this.target;
			}
		};

		CountDown.STATUS_STOP = 'stop';
		CountDown.STATUS_RUNNING = 'running';
		CountDown.STATUS_PAUSE = 'pause';
		CountDown.STATUS_END = 'end';

		// window.CountDown = CountDown;

		return new CountDown(options);
	}
}



