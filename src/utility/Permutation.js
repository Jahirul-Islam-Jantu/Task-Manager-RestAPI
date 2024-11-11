const generatePermutations = (str) => {
    const permutations = [];
    function permute(str, left, right) {
        if (left == right) {
            permutations.push(str);
        } else {
            for (let i = left; i <= right; i++) {
                str = swap(str, left, i);
                permute(str, left + 1, right);
                str = swap(str, left, i);
            }
        }
    }
    function swap(a, i, j) {
        const charArray = a.split("");
        const temp = charArray[i];
        charArray[i] = charArray[j];
        charArray[j] = temp;
        return charArray.join("");
    }
    permute(str, 0, str.length - 1);
    return permutations;
}



export default generatePermutations;