import {React, Component} from 'react'
import {Upload, message} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return false;
}

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: this.props.image ? process.env.REACT_APP_BASE_IMAGE_PATH + this.props.image : null,
      loading: false,
      fileList: {},
      uploading: false
    };
  };


  componentDidUpdate(prevProps) {
    if (prevProps.image !== this.props.image) {
      if (this.props.image) {
        this.setState({imageUrl: process.env.REACT_APP_BASE_IMAGE_PATH + this.props.image})

      }

    }
  }

  handleChange = info => {
    getBase64(info.file, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      console.log(info.file)
    );
    this.props.saveImage(info.file)
  };

  render() {
    const {loading, imageUrl} = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined/> : <PlusOutlined/>}
        <div style={{marginTop: 8}}>Upload</div>
      </div>
    );

    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
      </Upload>
    );
  }
}

export default Uploader
