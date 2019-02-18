import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { setFilterYStart, setFilterYEnd, unFilter } from './../reducers/filterReducer'
import { connect } from 'react-redux'


class Options extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      yearStart: 1960,
      yearEnd: 2018
    }
  }

 handleSubmit = (e) => {
   e.preventDefault()
   this.props.setFilterYStart(this.state.yearStart.toString())
   this.props.setFilterYEnd(this.state.yearEnd.toString())
 }

  fieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { yearStart, yearEnd } = this.state
    return (
      <div>
        <Form onSubmit={this.handleSubmit} size={'mini'}>
          <Form.Group widths='equal'>
            <Form.Field >
              <input name="yearStart" type="number"  value={yearStart} onChange={this.fieldChange}/>
              <label>Year Start</label>
            </Form.Field>
            <Form.Field >
              <input name="yearEnd" type="number"  value={yearEnd} onChange={this.fieldChange}/>
              <label>Year End</label>
            </Form.Field>
            <Form.Field>
              <Button size='mini' type="submit">filter</Button>
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

export default connect(mapStateToProps, { setFilterYStart, setFilterYEnd, unFilter })(Options)

