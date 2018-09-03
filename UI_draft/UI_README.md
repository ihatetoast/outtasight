# UI directory for OuttaSight

This readme comprises notes to myself.

## classnames

npm install classnames --savenpm install createclass

from npm package to render conditional classes:

```
destructuring:
const {errors}: this.state; //pulls out errors from state IFF i've made a point to save them there on serverside

in jsx use classnames('default-class', {'class-to-apply': errors.key})
<input
  type="text"
  className={classnames('form-control form-control-lg', {'is-invalid': errors.name})}
/>
{/* conditional rendering of html using js*/}
{errors.name && (<div className="invalid-msg">{errors.name}</div>)}
```

```
import classnames from 'classnames';

var Button = React.createClass({
// ...
render () {
var btnClass = 'btn';
if (this.state.isPressed) btnClass += ' btn-pressed';
else if (this.state.isHovered) btnClass += ' btn-over';
return <button className={btnClass}>{this.props.label}</button>;
}
});
```

You can express the conditional classes more simply as an object:

```
var classNames = require('classnames');

var Button = React.createClass({
  // ...
  render () {
    var btnClass = classNames({
      btn: true,
      'btn-pressed': this.state.isPressed,
      'btn-over': !this.state.isPressed && this.state.isHovered
    });
    return <button className={btnClass}>{this.props.label}</button>;
  }
});
```

make sure htere are classes to address valid entries as well as visited links
