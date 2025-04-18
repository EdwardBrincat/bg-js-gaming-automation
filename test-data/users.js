module.exports = [
    { username: 'standard_user', password: 'secret_sauce', expectedUrl: 'https://example.com/dashboard1' },
    { username: 'locked_out_user', password: 'secret_sauce', expectedUrl: 'https://example.com/dashboard2' },
    { username: 'problem_user', password: 'secret_sauce', expectedUrl: 'https://example.com/dashboard3' },
    { username: 'performance_glitch_user', password: 'secret_sauce', expectedUrl: 'https://example.com/dashboard3' },
    { username: 'error_user', password: 'secret_sauce', expectedUrl: 'https://example.com/dashboard3' },
    { username: 'visual_user', password: 'secret_sauce', expectedUrl: 'https://example.com/dashboard3' }
  ];