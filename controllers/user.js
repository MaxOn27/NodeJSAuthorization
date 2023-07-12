const bcrypt = require('bcryptjs');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

exports.signUp = async (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const lastname = req.body.lastname;
  const password = await bcrypt.hash(req.body.password, 12);
  const confirmPassword = req.body.confirmPassword;

  if (!email || !name || !lastname || !password || !confirmPassword) {
    req.flash('error', 'All the fields must be fulfilled!');
    return res.redirect('/auth/signup');
  }

  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  });

  if (user) {
    req.flash('error', 'E-Mail exists already, please pick a different one.');
    return res.redirect('/auth/signup');
  }

  if (password !== confirmPassword) {
    req.flash('error', 'Passwords not matching');
    return res.redirect('/auth/signup')
  }

  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      lastname: req.body.lastname,
      password
    }
  });
  res.redirect('/auth/signin');
}

exports.signIn = async (req, res, next) => {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    }
  });

  if (!user) {
    req.flash('error', 'Invalid email or password.');
    return res.redirect('/auth/signin');
  }

  const checkPassword = await bcrypt.compare(req.body.password, user.password)

  if (!checkPassword) {
    req.flash('error', "Password not matching");
    return res.redirect('/auth/signin')
  }

  req.session.isLoggedIn = true;
  req.session.user = user;
  return req.session.save(err => {
    console.log(err);
    res.redirect('/');
  });
}

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};