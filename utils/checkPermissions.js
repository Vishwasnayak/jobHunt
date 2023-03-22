import {UnAuthenticatedError}  from "../errors/index.js"

const checkPermissions = (requestUser, resourceUserId) => {
    if (requestUser.userId === resourceUserId.toString()) return //here resourceid is job created person only he can edit
  
    throw new UnAuthenticatedError('Not authorized to access this route')
  }
  
  export default checkPermissions

