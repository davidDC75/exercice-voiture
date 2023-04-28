class voiture {
    engine = false;
    ambiantTemp = 15;
    temp = 15;
    speed = 0;
    rpm = 0;
    fuel = 100;
    fuelStep = 0;
    odometre = 0;

    speedNeedleAngle = -210;
    speedNeedleAngleStep = 11;

    rpmNeedleAngle = -210;
    rpmNeedleAngleStep = 40;

    intervalValueMs = 2000;
    myInterval = Object;

    rpmNeedle = document.getElementById('rpm-needle');
    rpmText = document.getElementById('rpm-value');
    speedNeedle = document.getElementById('speed-needle');
    speedText = document.getElementById('speed-value');
    tempText = document.getElementById('temperature-indicator');
    fuelText = document.getElementById('fuel-indicator');
    kmIndicator = document.getElementById('km-indicator');

    btnStartEngine = document.getElementById('start-button');
    btnRefuel=document.getElementById('refuel');
    btnIncreaseSpeed=document.getElementById('increase-button');    
    btnDecreaseSpeed=document.getElementById('decrease-button');
    btnStopEngine=document.getElementById('stop-button');

    constructor() {
        this.refreshTemp();
        this.refreshFuel();
        this.btnIncreaseSpeed.style.visibility='hidden';
        this.btnDecreaseSpeed.style.visibility='hidden';
        this.btnStopEngine.style.visibility='hideen';
    }

    startEngine() {
        if (!this.engine && this.fuel>0) {
            this.engine = true;
            this.rpm=0;
            this.refreshRegime();
            this.myInterval=setInterval( () => this.intervalEngine(),this.intervalValueMs);
            this.btnStartEngine.style.visibility='hidden';
            this.btnRefuel.style.visibility='hidden';
            this.btnIncreaseSpeed.style.visibility='visible';
            this.btnDecreaseSpeed.style.visibility='visible';
            this.btnStopEngine.style.visibility='visible';
        }
    }

    stopEngine() {
        if (this.engine) {
            this.engine = false;
            this.temp = this.ambiantTemp;
            this.refreshTemp();
            this.speed=0;
            this.speedNeedleAngle=-210;
            this.speedNeedle.style.transform = 'rotate(-210deg)';
            this.refreshSpeed();
            this.rpm=0;
            this.refreshRegime();
            this.rpmNeedleAngle=-210;
            this.rpmNeedle.style.transform = 'rotate(-210deg)';
            this.fuelStep=0;    
            clearInterval(this.myInterval);
            if (this.fuel>0) this.btnStartEngine.style.visibility='visible';
            else this.btnStartEngine.style.visibility='hidden';
            this.btnRefuel.style.visibility='visible';
            this.btnIncreaseSpeed.style.visibility='hidden';
            this.btnDecreaseSpeed.style.visibility='hidden';
            this.btnStopEngine.style.visibility='hidden';
        }
    }

    increaseSpeed() {
        if (this.engine) {
            if (this.speed<220) {
                this.speed+=10;
                this.speedNeedleAngle+=this.speedNeedleAngleStep;
                this.speedNeedle.style.transform = 'rotate('+this.speedNeedleAngle+'deg)';
                this.refreshSpeed();
                this.calculateRpm();
            }
        }
    }

    decreaseSpeed() {
        if (this.engine) {
            if (this.speed>0) {
                this.speed-=10;
                this.speedNeedleAngle-=this.speedNeedleAngleStep;
                this.speedNeedle.style.transform = 'rotate('+this.speedNeedleAngle+'deg)';
                this.refreshSpeed();
                this.calculateRpm();
            }
        }
    }

    intervalEngine() {
        if (this.fuel<=0) {
            this.stopEngine();
        } else {
            this.fuel-=this.fuelStep;
            if (this.fuel<0) this.fuel=0;
            this.refreshFuel();
            this.calculateRpm();
            this.calculateKm();
            this.refreshKm();
        }
    }

    calculateRpm() {
        if (this.speed>0 && this.speed<50) {
            this.rpmNeedleAngle=-180;
            this.rpm=400;
            this.refreshRegime();
            this.temp=30;
            this.refreshTemp();
            this.fuelStep=2;
        }
        if (this.speed>50 && this.speed<100) {
            this.rpmNeedleAngle=-150;
            this.rpm=1000;
            this.refreshRegime();
            this.temp=40;
            this.refreshTemp();
            this.fuelStep=3;
        }
        if (this.speed>100 && this.speed<150) {
            this.rpmNeedleAngle=-100;
            this.rpm=2000;
            this.temp=50;
            this.refreshTemp();
            this.refreshRegime();
            this.fuelStep=5;
        }
        if (this.speed>150 && this.speed<200) {
            this.rpmNeedleAngle=0;
            this.rpm=3500;
            this.refreshRegime()
            this.temp=30;
            this.refreshTemp();
            this.fuelStep=7;
        }
        if (this.speed>200 && this.speed<=220) {
            this.rpmNeedleAngle=20;
            this.rpm=5500;
            this.refreshRegime();
            this.temp=70;
            this.refreshTemp();
            this.fuelStep=9;
        }
    }

    calculateKm() {
        let nbKm=0;
        if (this.speed>0) nbKm=(this.speed/3600000)*this.intervalValueMs;
        this.odometre+=nbKm;
    }

    refuel() {
        if (!this.engine) {
            this.fuel=100;
            this.refreshFuel();
            this.btnStartEngine.style.visibility='visible';
        }
    }

    refreshRegime() {
        this.rpmText.textContent=this.rpm;
        this.rpmNeedle.style.transform='rotate('+this.rpmNeedleAngle+'deg)';
    }

    refreshSpeed() {
        this.speedText.textContent=this.speed;
    }

    refreshTemp() {
        this.tempText.textContent=this.temp;
    }

    refreshFuel() {
        this.fuelText.textContent=this.fuel;
    }

    refreshKm() {
        this.kmIndicator.textContent=this.toFixed(this.odometre,3);
    }

    toFixed(n, fractionalDigits) {
        const factor = 10 ** fractionalDigits;
        return Math.round(n*factor)/factor;
    }
}

car = new voiture();

btnStartEngine=document.getElementById('start-button');
btnStartEngine.onclick = () => {
    car.startEngine();
}

btnStopEngine=document.getElementById('stop-button');
btnStopEngine.onclick = () => {
    car.stopEngine();
}

btnIncreaseSpeed=document.getElementById('increase-button');
btnIncreaseSpeed.onclick = () => {
    car.increaseSpeed();
}

btnDecreaseSpeed=document.getElementById('decrease-button');
btnDecreaseSpeed.onclick = () => {
    car.decreaseSpeed();
}

btnRefuel=document.getElementById('refuel');
btnRefuel.onclick = () => {
    car.refuel();
}