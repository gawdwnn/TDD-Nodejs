export default function ValidationException(errors) {
  this.status = 400;
  this.errors = errors;
}
