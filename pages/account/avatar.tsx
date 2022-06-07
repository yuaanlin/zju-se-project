import React, { useState } from 'react'
import { Upload, message, Button } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'

const getBase64 = (file)=>new Promise((resolve, reject) =>{
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})

const beforeUpload = (file)=>{
  const type = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!type)
    message.error('You can only upload JPG/PNG file!')

  const size = file.size / 1024 / 1024 < 1
  if (!size)
    message.error('Image must smaller than 1MB!')

  return type&&size
}

const Avatar = ({value, onChange})=>{
  const [loading, setLoading] = useState(false)
  const handleChange = ({file})=>{
    switch(file.status)
    {
    case 'uploading':
      setLoading(true)
      break
    case 'done':
      getBase64(file.originFileObj)
      .then(imageUrl=>{
        onChange(imageUrl)
        setLoading(false)
      })
      .catch(error=>console.log(error))
      break
    default: break
    }
  }
  return (<ImgCrop rotate>
    <Upload
    name="avatar"
    listType="picture-card"
    className="avatar-uploader"
    showUploadList={false}
    beforeUpload={beforeUpload}
    onChange={handleChange}
    >
    { value 
    ? <img src={value} alt="avatar" style={{ width: '100%' }} /> 
    : <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    }
    </Upload>
  </ImgCrop>)
}

export default Avatar