import nodemailer from 'nodemailer';
import config from 'config';

const mailConfig = config.get('mail');

const transporter = nodemailer.createTransport({ ...mailConfig });

export default transporter;
