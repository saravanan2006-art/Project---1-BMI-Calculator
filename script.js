let w = document.querySelector("#wt");
let h = document.querySelector("#ht");
let butt = document.querySelector("#but");
let age = document.querySelector("#age");
let im = null;      // error image
let idimg = null;   // BMI image
let n = null;

butt.addEventListener("click", () => {
    // Remove previous outputs
    if(n) n.remove();
    if (im) im.remove();
    if (idimg) idimg.remove();
    const oldText = document.getElementById("bmi-text");
    if (oldText) oldText.remove();

    let a = parseFloat(w.value);
    let b = parseFloat(h.value);
    let x = parseFloat(age.value);

    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
        // Show error image
        im = document.createElement("img");
        im.id = "err";
        im.src = "error.jpg";
        im.width = 100;
        im.height = 50;
        document.body.appendChild(im);
        return;
    }

    let c = a / (b * b);

    if (x >= 18) {
        // Adult BMI
        idimg = document.createElement("img");
        idimg.id = "bmi-img";

        n = document.createElement("h2");
        n.id = "new";
        n.innerHTML = "Your BMI: " + c.toFixed(2);

        // Select image based on BMI
        if (c <= 18.5) idimg.src = "underwgt.jpg";
        else if (c <= 24.5) idimg.src = "normal.jpg";
        else if (c <= 30) idimg.src = "overwgt.jpg";
        else idimg.src = "obess.jpg";

        const res = document.getElementById("res");
        res.appendChild(n);
        res.appendChild(idimg);

    } else if (x > 0 && x < 18) {
        // Child BMI - fetch percentile
        fetch('data.json')
            .then(response => response.json())
            .then(bmiarr => {
                let ageStr = x.toString();
                let bmi = bmiarr[ageStr];
                let i = 0;
                while (i < bmi.length && bmi[i] < c) i++;

                const n = document.createElement("h2");
                n.id = "bmi-text";
                n.innerText = `Your BMI: ${(i / 10) * 100}%`;
                const res = document.getElementById("res");
                res.appendChild(n);
            });
    } else {
        // Invalid age
        im = document.createElement("img");
        im.id = "err";
        im.src = "error.jpg";
        im.width = 100;
        im.height = 50;
        document.getElementById("res").appendChild(im);
    }
});
