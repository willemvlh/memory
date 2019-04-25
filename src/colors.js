import _ from "lodash";

export default {
    colors: ["red", "green", "blue"],
    randomColor: function(){
        return _.sample(this.colors);
    }
};