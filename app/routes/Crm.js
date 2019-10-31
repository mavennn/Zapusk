
app.post('/api/admin/meetings/register/open', ctrl.Meeting.OpenRegister.run())
app.post('/api/admin/meetings/register/close', ctrl.Meeting.CloseRegister.run())

app.post('/api/admin/requests/list', ctrl.Request.ForAdmin.run())
app.post('/api/admin/meetings/list', ctrl.Meeting.ForAdmin.run())

app.post('/api/admin/schedule/save', ctrl.Schedule.CreateMany.run())
app.post('/api/admin/schedule/remove', ctrl.Schedule.Remove.run())
app.post('/api/admin/users/list', ctrl.Users.GetUsersAdmin.run())

app.post('/api/admin/static/get', ctrl.Statistic.run())
