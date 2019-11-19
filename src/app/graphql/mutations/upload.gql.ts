import gql from 'graphql-tag';

const SINGLE_UPLOAD = gql`
mutation cargarArchivo($file:Upload){
singleUpload(file:$file){
  image
}
}
`;

const MULTIPLE_UPLOAD = gql`
  mutation multipleUpload($text: String, $files: [Upload!]!) {
    multipleUpload(text: $text, files: $files) {
      id
      filename
    }
  }
`;

export { SINGLE_UPLOAD, MULTIPLE_UPLOAD };
