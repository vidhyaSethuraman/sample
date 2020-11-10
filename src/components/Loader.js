import React from 'react'

function Loader() {
    return (
        <div class="container">
            <div class="progress" style={{marginTop:"200px",width:"300px", marginLeft:"400px"}}>
                <div class="indeterminate"></div>
            </div>
        </div>
    )
}

export default Loader
