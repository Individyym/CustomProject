
class Scroller {
    
    /* Set basic section Scroll elements */
    container: HTMLElement;
    objectToScroll: HTMLElement;
    scrollingObj: HTMLElement;
    currentScroll: number;
    currentThumbScroll: number;
    maxScroll: number;
    typedJs: boolean;
    step: number;
    thumbStep: number;
    thumbAdditionalStep: number;
    oldHeight: number;
    
    /* Set Scrollbar tracker */
    scrollBar: HTMLElement;
    scrollThumb: HTMLElement;
    contRercentage: number;
    barPercentage: number;
    wasDisabled: boolean;

    constructor(initStep: number) {
        
        this.step = initStep;
        this.container = document.getElementById('root-body');
        this.objectToScroll = document.getElementById('root-container');
        this.scrollingObj = document.getElementById('root-container');
        this.currentScroll = 0;
        this.currentThumbScroll = 0;
        this.wasDisabled = false;
        this.maxScroll = -Math.abs(this.scrollingObj.clientHeight);
        this.scrollBar = <HTMLElement>document.getElementsByClassName('scrollbar-track-y')[0];
        this.scrollThumb = <HTMLElement>this.scrollBar.getElementsByClassName('scrollbar-thumb-y')[0];

        this.contRercentage = Math.abs(this.maxScroll) / 100;
        this.barPercentage = (this.scrollBar.clientHeight) / 100;

        this.scrollThumb.style.height = (this.barPercentage * 10) + 'px';
        this.scrollBar.classList.add("active-scroll-thumb");
        this.thumbStep = Math.abs((this.step / (this.scrollingObj.clientHeight + this.barPercentage * 10 - window.innerHeight)) * 100);
        
        this.container.addEventListener('wheel', this.translateScroll);
        window.addEventListener("resize", this.resizeRecalculate);

        console.log('Scroller Initialized.');
    }

    translateScroll = (e) => {
        if(window.innerWidth > 992 ){
            if (e.deltaY < 0) {
                if(this.currentScroll < 0){
                    this.currentScroll += this.step;
                    if(this.currentScroll > 0){
                        this.currentScroll = 0;
                    }
                    this.objectToScroll.style.transform = 'translateY(' + this.currentScroll + 'px)';
        
                    /* Move ScrollBar tracker */
                    
                    this.currentThumbScroll -= this.scrollBar.clientHeight * this.thumbStep / 100;
                    if(this.currentThumbScroll < 0){
                        this.currentThumbScroll = 0;
                    }
                    this.scrollThumb.style.transform = 'translateY(' + this.currentThumbScroll + 'px)';
                    
                }
            }
            if (e.deltaY > 0) {
                if(this.maxScroll + document.documentElement.clientHeight + this.step < this.currentScroll){
                    
                    this.currentScroll -= this.step;
                    
                    this.objectToScroll.style.transform = 'translateY(' + this.currentScroll + 'px)';
                    
                    this.currentThumbScroll += this.scrollBar.clientHeight * this.thumbStep / 100;
                    if(this.currentThumbScroll > window.innerHeight - this.barPercentage * 10){
                        this.currentThumbScroll = window.innerHeight - this.barPercentage * 10;
                    }
                    this.scrollThumb.style.transform = 'translateY(' + this.currentThumbScroll + 'px)';
                    
                }
            }
        }
    }

    //Recalculate Scroll parameters onResize
    resizeRecalculate = (e) => {
        if(this.wasDisabled){
            window.scrollTo(0,0);
            this.wasDisabled = false;
        }
        this.oldHeight = Math.abs(this.maxScroll);
        //calculate main properties 
        this.maxScroll = -Math.abs(this.scrollingObj.clientHeight);
        this.contRercentage = Math.abs(this.maxScroll) / 100;
        this.barPercentage = (this.scrollBar.clientHeight) / 100;

        this.scrollThumb.style.height = (this.barPercentage * 10) + 'px';
        this.thumbStep = Math.abs((this.step / (this.scrollingObj.clientHeight + this.barPercentage * 10 - window.innerHeight)) * 100);
        
        //Watch for bottom offset
        console.log(this.maxScroll + document.documentElement.clientHeight + 100);
        console.log(this.currentScroll);
        if(this.maxScroll + document.documentElement.clientHeight + 100 >= this.currentScroll){
            this.currentScroll = this.maxScroll + document.documentElement.clientHeight;
            this.objectToScroll.style.transform = 'translateY(' + this.currentScroll + 'px)';
        }
        //change scroll-thumb position
        if(this.oldHeight === Math.abs(this.maxScroll)){
            console.log('Resize =');
            console.log('Do absolutely NOTHING!');
        }else if(this.oldHeight < Math.abs(this.maxScroll)){
            let temp = (Math.abs(this.currentScroll) / this.maxScroll) * 100;
            this.currentThumbScroll = Math.abs(this.barPercentage * temp);
            if(this.currentThumbScroll > this.scrollBar.clientHeight - this.barPercentage * 10){
                this.currentThumbScroll = this.scrollBar.clientHeight;
            }
            this.scrollThumb.style.transform = 'translateY(' + this.currentThumbScroll + 'px)';
        }else{
            let temp = (Math.abs(this.currentScroll) / this.maxScroll) * 100;
            this.currentThumbScroll = Math.abs(this.barPercentage * Math.abs(temp));
            if(this.currentThumbScroll < 0){
                this.currentThumbScroll = 0;
            }
            this.scrollThumb.style.transform = 'translateY(' + this.currentThumbScroll + 'px)';
        }
        if(window.innerWidth < 992 ){ //Disable Custom scroll for mobile diveces
            this.currentScroll = 0;
            this.currentThumbScroll = 0;
            this.objectToScroll.style.transform = 'translateY(' + this.currentScroll + 'px)';
            this.scrollThumb.style.transform = 'translateY(' + this.currentThumbScroll + 'px)';
            this.wasDisabled = true;
        }
        console.log('Resized.');
    }

}

let ScrollController: Scroller = new Scroller(50);