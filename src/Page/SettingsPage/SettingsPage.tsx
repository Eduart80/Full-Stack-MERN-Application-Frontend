import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BackButton from '../../Components/BackButton/BackButton';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    taskReminders: false,
    darkMode: false,
    language: 'English'
  });

  const handleToggle = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({
      ...prev,
      language: e.target.value
    }));
  };

  return (
    <>
    <div className="d-flex align-items-center">
        <BackButton />
       </div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Settings</h2>
        <Link to="/" className="btn btn-secondary">
          Back to Dashboard
        </Link>
      </div>

      <div className="row">
        <div className="col-md-8">
          {/* Account Settings */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Account Settings</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" placeholder="john_doe" disabled />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="john@example.com" disabled />
              </div>
              <button className="btn btn-primary">Update Profile</button>
            </div>
          </div>

          {/* Notifications */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Notifications</h5>
            </div>
            <div className="card-body">
              <div className="form-check form-switch mb-3">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                />
                <label className="form-check-label" htmlFor="emailNotifications">
                  Email Notifications
                </label>
              </div>
              <div className="form-check form-switch mb-3">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="taskReminders"
                  checked={settings.taskReminders}
                  onChange={() => handleToggle('taskReminders')}
                />
                <label className="form-check-label" htmlFor="taskReminders">
                  Task Reminders
                </label>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Preferences</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Language</label>
                <select 
                  className="form-select" 
                  value={settings.language}
                  onChange={handleLanguageChange}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
              <div className="form-check form-switch mb-3">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="darkMode"
                  checked={settings.darkMode}
                  onChange={() => handleToggle('darkMode')}
                />
                <label className="form-check-label" htmlFor="darkMode">
                  Dark Mode (Legacy)
                </label>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Security</h5>
            </div>
            <div className="card-body">
              <button className="btn btn-warning me-2">Change Password</button>
              <button className="btn btn-outline-secondary">Enable 2FA</button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card border-danger mb-4">
            <div className="card-header bg-danger text-white">
              <h5 className="mb-0">Danger Zone</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="btn btn-danger">Delete Account</button>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Quick Info</h6>
              <p className="small text-muted">
                Customize your experience by adjusting your preferences and notification settings.
              </p>
              <hr />
              <div className="small">
                <p><strong>Account Type:</strong> Free</p>
                <p><strong>Member Since:</strong> Jan 2024</p>
                <p><strong>Last Login:</strong> Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
