/* eslint-disable no-unused-vars */
import {
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Container,
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup.string().required("Please select a subject"),
  message: yup.string().required("Message is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    setResponseMessage(null);

    try {
      await axios.post(`https://jsonplaceholder.typicode.com/posts`, data);
      setResponseMessage({
        type: "success",
        text: "Message sent successfully!",
      });
      reset();
    } catch (error) {
      setResponseMessage({
        type: "error",
        text: "Failed to send message. Try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, mt: 4, bgcolor: "white" }}>
        <Typography variant="h5" gutterBottom align="center">
          Contact Us
        </Typography>
        {responseMessage && (
          <Typography
            color={responseMessage.type === "success" ? "green" : "red"}
            align="center"
          >
            {responseMessage.text}
          </Typography>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          {/* Phone Field */}
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone"
                fullWidth
                margin="normal"
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />

          {/* Subject Dropdown */}
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Select Subject"
                fullWidth
                margin="normal"
                error={!!errors.subject}
                helperText={errors.subject?.message}
              >
                <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                <MenuItem value="Support">Support</MenuItem>
                <MenuItem value="Feedback">Feedback</MenuItem>
              </TextField>
            )}
          />

          {/* Message Field */}
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Message"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                error={!!errors.message}
                helperText={errors.message?.message}
              />
            )}
          />

          {/* Submit Button */}
          <Box textAlign="center" mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Send Message"}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ContactUs;
