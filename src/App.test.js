import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { socket } from './socket/openSocket';
import {configure, shallow, mount} from 'enzyme';
import {UploadFile} from '../src/components/index'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });


describe('UploadFile component', () => {
let component = null, uploadButton = null, cancelButton = null;
const mockFunction = jest.fn();

  beforeEach(() => {
    component = mount(
        <UploadFile 
            socket={socket} 
            onPause={mockFunction} 
            onResume={mockFunction} 
            onCancel={mockFunction} 
            />
        )
    component.find('#fileInput').simulate('change', {
          target: {
            files: [ 'dummyfile.mp4']
          }
        });
        uploadButton = component.find('.upload-btn');
        cancelButton = component.find('.cancel-btn');
  })
  // afterEach(()=> component.unmount())

  it('Should Pause the Upload', (done) => {
    uploadButton.simulate('click').simulate('click');
      expect(mockFunction).toHaveBeenCalled();
      expect(component.state('pauseUpload')).toBeFalsy();
      done();
  })

  it('Should Reasume the Uplaod', (done) => {
    uploadButton.simulate('click').simulate('click').simulate('click');
    expect(mockFunction).toHaveBeenCalled();
    expect(component.state('resume')).toBeTruthy();
    expect(component.state('pauseUpload')).toBeTruthy();
    done();
  })

  it('Should Cancel the Upload', (done) => {
    cancelButton.simulate('click');
    expect(mockFunction).toHaveBeenCalled();
    setTimeout(() => {
      expect(component.state('allFiles')).toBeFalsy();
     }, 0);
    expect(component.state('cancel')).toEqual(true);
    done();
  })
})
