import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Link } from 'react-router'

import Tasks from '/imports/api/Tasks'

const ChecklistTasks = React.createClass({  
  render(){
    return(
      <div>
        {this.props.tasks.map(
            (task) => 
              <div key={task._id} className="taskLink" >
                <span>
                  <input type="checkbox" onChange={()=>this.props.toggleCompleted(task._id)} defaultChecked={task.completed}/>
                  {task.name} 
                </span>
                <span onClick={()=>this.props.removeTask(task._id)} className="deleteIcon"> &#10060; </span>
              </div>
        )}
      </div>
    )
  }
})

export default createContainer((props) => {
  Meteor.subscribe('checklistTasks')
  return {
    tasks: Tasks.find({checklistId: props.checklistId}).fetch()
  }
}, ChecklistTasks)
