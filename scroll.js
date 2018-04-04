var Scroller = /** @class */ (function () {
    function Scroller(initStep) {
        var _this = this;
        this.translateScroll = function (e) {
            if (window.innerWidth > 992) {
                if (e.deltaY < 0) {
                    if (_this.currentScroll < 0) {
                        _this.currentScroll += _this.step;
                        if (_this.currentScroll > 0) {
                            _this.currentScroll = 0;
                        }
                        _this.objectToScroll.style.transform = 'translateY(' + _this.currentScroll + 'px)';
                        /* Move ScrollBar tracker */
                        _this.currentThumbScroll -= _this.scrollBar.clientHeight * _this.thumbStep / 100;
                        if (_this.currentThumbScroll < 0) {
                            _this.currentThumbScroll = 0;
                        }
                        _this.scrollThumb.style.transform = 'translateY(' + _this.currentThumbScroll + 'px)';
                    }
                }
                if (e.deltaY > 0) {
                    if (_this.maxScroll + document.documentElement.clientHeight + _this.step < _this.currentScroll) {
                        _this.currentScroll -= _this.step;
                        _this.objectToScroll.style.transform = 'translateY(' + _this.currentScroll + 'px)';
                        _this.currentThumbScroll += _this.scrollBar.clientHeight * _this.thumbStep / 100;
                        if (_this.currentThumbScroll > window.innerHeight - _this.barPercentage * 10) {
                            _this.currentThumbScroll = window.innerHeight - _this.barPercentage * 10;
                        }
                        _this.scrollThumb.style.transform = 'translateY(' + _this.currentThumbScroll + 'px)';
                    }
                }
            }
        };
        //Recalculate Scroll parameters onResize
        this.resizeRecalculate = function (e) {
            if (_this.wasDisabled) {
                window.scrollTo(0, 0);
                _this.wasDisabled = false;
            }
            _this.oldHeight = Math.abs(_this.maxScroll);
            //calculate main properties 
            _this.maxScroll = -Math.abs(_this.scrollingObj.clientHeight);
            _this.contRercentage = Math.abs(_this.maxScroll) / 100;
            _this.barPercentage = (_this.scrollBar.clientHeight) / 100;
            _this.scrollThumb.style.height = (_this.barPercentage * 10) + 'px';
            _this.thumbStep = Math.abs((_this.step / (_this.scrollingObj.clientHeight + _this.barPercentage * 10 - window.innerHeight)) * 100);
            //Watch for bottom offset
            console.log(_this.maxScroll + document.documentElement.clientHeight + 100);
            console.log(_this.currentScroll);
            if (_this.maxScroll + document.documentElement.clientHeight + 100 >= _this.currentScroll) {
                _this.currentScroll = _this.maxScroll + document.documentElement.clientHeight;
                _this.objectToScroll.style.transform = 'translateY(' + _this.currentScroll + 'px)';
            }
            //change scroll-thumb position
            if (_this.oldHeight === Math.abs(_this.maxScroll)) {
                console.log('Resize =');
                console.log('Do absolutely NOTHING!');
            }
            else if (_this.oldHeight < Math.abs(_this.maxScroll)) {
                var temp = (Math.abs(_this.currentScroll) / _this.maxScroll) * 100;
                _this.currentThumbScroll = Math.abs(_this.barPercentage * temp);
                if (_this.currentThumbScroll > _this.scrollBar.clientHeight - _this.barPercentage * 10) {
                    _this.currentThumbScroll = _this.scrollBar.clientHeight;
                }
                _this.scrollThumb.style.transform = 'translateY(' + _this.currentThumbScroll + 'px)';
            }
            else {
                var temp = (Math.abs(_this.currentScroll) / _this.maxScroll) * 100;
                _this.currentThumbScroll = Math.abs(_this.barPercentage * Math.abs(temp));
                if (_this.currentThumbScroll < 0) {
                    _this.currentThumbScroll = 0;
                }
                _this.scrollThumb.style.transform = 'translateY(' + _this.currentThumbScroll + 'px)';
            }
            if (window.innerWidth < 992) { //Disable Custom scroll for mobile diveces
                _this.currentScroll = 0;
                _this.currentThumbScroll = 0;
                _this.objectToScroll.style.transform = 'translateY(' + _this.currentScroll + 'px)';
                _this.scrollThumb.style.transform = 'translateY(' + _this.currentThumbScroll + 'px)';
                _this.wasDisabled = true;
            }
            console.log('Resized.');
        };
        this.step = initStep;
        this.container = document.getElementById('root-body');
        this.objectToScroll = document.getElementById('root-container');
        this.scrollingObj = document.getElementById('root-container');
        this.currentScroll = 0;
        this.currentThumbScroll = 0;
        this.wasDisabled = false;
        this.maxScroll = -Math.abs(this.scrollingObj.clientHeight);
        this.scrollBar = document.getElementsByClassName('scrollbar-track-y')[0];
        this.scrollThumb = this.scrollBar.getElementsByClassName('scrollbar-thumb-y')[0];
        this.contRercentage = Math.abs(this.maxScroll) / 100;
        this.barPercentage = (this.scrollBar.clientHeight) / 100;
        this.scrollThumb.style.height = (this.barPercentage * 10) + 'px';
        this.scrollBar.classList.add("active-scroll-thumb");
        this.thumbStep = Math.abs((this.step / (this.scrollingObj.clientHeight + this.barPercentage * 10 - window.innerHeight)) * 100);
        this.container.addEventListener('wheel', this.translateScroll);
        window.addEventListener("resize", this.resizeRecalculate);
        console.log('Scroller Initialized.');
    }
    return Scroller;
}());
var ScrollController = new Scroller(50);
