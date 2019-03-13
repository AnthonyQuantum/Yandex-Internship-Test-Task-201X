function $(className) {
    return new $container(document.querySelectorAll("."+className));
}

function $container(v) {
    this.v = v;
}



$container.prototype.item = function(index) {
    if (this.v.length === undefined)
        return this; 
    if (index === undefined) {
        this.v = this.v[0];
    } else {
        this.v = this.v[index];
    }
    return this;
}

$container.prototype.add = function(className) {
    if (className !== undefined) {
        if (this.v.length === undefined)
            this.v.classList.add(className);
        else {
            for (let elem of this.v) {
                elem.classList.add(className);
            }
        }
    }
    return this;
}

$container.prototype.remove = function(className) {
    if (className !== undefined) {
        if (this.v.length === undefined)
            this.v.classList.remove(className);
        else {
            for (let elem of this.v) {
                elem.classList.remove(className);
            }
        }
    }
    return this;
}

$container.prototype.toggle = function(className) {
    if (className !== undefined) {
        if (this.v.length === undefined)
            this.v.classList.toggle(className);
        else {
            for (let elem of this.v) {
                elem.classList.toggle(className);
            }
        }
    }
    return this;
}

$container.prototype.has = function(className) {
    if (className === undefined)
        return false;
    if (this.v.length === undefined)
        return this.v.classList.contains(className);
    else {
        for (let elem of this.v) {
            if (elem.classList.contains(className))
                return true;
        }
        return false;
    }
}



window.onload = function() {
    console.log($('cl1').has());
}