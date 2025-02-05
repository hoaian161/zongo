export default function rand(minimum: number, maximum: number) {
    return Math.round(Math.random() * (maximum - minimum) + minimum);
}