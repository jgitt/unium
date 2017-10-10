//-------------------------------------------------------------------------------

import React from 'react'
import { connect } from 'react-redux'

import {
  Modal,
  Button,
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,
  DropdownButton,
  InputGroup,
  MenuItem,
  Panel,
  HelpBlock
} from 'react-bootstrap'


import { CancelDialog } from '../actions/App.jsx'


//-------------------------------------------------------------------------------

@connect( (store) => {
  return {
    app: store.app
  }
})
export default class AcModalAddPanel extends React.Component {

  onCancel = () => {
    this.props.dispatch( CancelDialog() )
  }

  onOK = () => {
    if( this.state.name != '' ) {
      this.state.type = this.state.type.toLowerCase()
      this.props.app.dialog.callback( this.state )
    }
    this.state = {
      name  : '',
      type  : 'Default'
    }
    this.onCancel()
  }


  //-------------------------------------------------------------------------------

  constructor( props ) {
    super( props )
    this.state = {
      name  : '',
      type  : 'Default'
    }
  }

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  }

  onChangeType = (v) => {
    this.setState({ type: v });
  }


  //-------------------------------------------------------------------------------

  render() {

    var { app } = this.props
    var { dialog } = app

    if( dialog == null || dialog.modal != "addPanel" ) {
      return null
    }
    
    return (
      <Modal show={true} onHide={this.onCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Add Panel</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Form horizontal>
            <FormGroup controlId="formName">
              <Col componentClass={ControlLabel} sm={2}>
                Name
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  value={this.state.name}
                  onChange={this.onChangeName}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formType">
              <Col smOffset={2} sm={10}>
              <DropdownButton
                  componentClass={InputGroup.Button}
                  id="formType"
                  title={this.state.type}
                >
                  <MenuItem key="1" onSelect={()=>this.onChangeType('Default')}>
                    <Panel header="Default"/>
                  </MenuItem>
                  <MenuItem key="2" onSelect={()=>this.onChangeType('Primary')}>
                    <Panel header="Primary" bsStyle="primary"/>
                  </MenuItem>
                  <MenuItem key="3" onSelect={()=>this.onChangeType('Success')}>
                    <Panel header="Success" bsStyle="success"/>
                  </MenuItem>
                  <MenuItem key="4" onSelect={()=>this.onChangeType('Info')}>
                    <Panel header="Info" bsStyle="info"/>
                  </MenuItem>
                  <MenuItem key="5" onSelect={()=>this.onChangeType('Warning')}>
                    <Panel header="Warning" bsStyle="warning"/>
                  </MenuItem>
                  <MenuItem key="6" onSelect={()=>this.onChangeType('Danger')}>
                    <Panel header="Danger" bsStyle="danger"/>
                  </MenuItem>
                </DropdownButton>
              </Col>
            </FormGroup>

          </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="default" onClick={this.onCancel}>Cancel</Button>
            <Button bsStyle="success" onClick={this.onOK}>Create Panel</Button>
          </Modal.Footer>          
      </Modal>
    )
  }
}