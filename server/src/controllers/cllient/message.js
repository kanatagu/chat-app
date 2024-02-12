const pool = require('../../db/pool');
const validateForm = require('../../utils/validateForm');
const { messageSchema } = require('../../schema/message');

/**
 * GET messages
 * @route GET /api/messages
 * @access Private
 */
const getMessages = async (req, res) => {
  const { roomId } = req.query;

  if (!roomId) return res.status(400).json({ message: 'Room ID is required' });

  try {
    const messages = await pool.query(
      'SELECT messages.*, users.image_icon, users.username FROM messages LEFT JOIN users ON messages.user_id = users.id WHERE messages.room_id = $1 ORDER BY messages.created_at DESC LIMIT 100',
      [roomId]
    );

    return res.status(200).json(messages.rows);
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc     Update message
 * @route    PUT /api/messages/:id
 * @access   Private
 */
const updateMessage = async (req, res) => {
  try {
    await validateForm(messageSchema, req.body);
    const { message } = req.body;
    const { id: messageId } = req.params;
    const { id: userId } = req.user;

    // Message Check
    const existingMessage = await pool.query(
      'SELECT * FROM messages WHERE id = $1',
      [messageId]
    );

    if (!existingMessage.rows[0]) {
      throw new Error('Message not found');
    }

    if (existingMessage.rows[0].user_id !== userId) {
      throw new Error('You are not authorized to update this message');
    }

    // Update message
    const updatedMessage = await pool.query(
      'UPDATE messages SET message = $1 WHERE id = $2 RETURNING *',
      [message, messageId]
    );

    res.status(200).json(updatedMessage.rows[0]);
  } catch (error) {
    if (error.validationError) {
      // Validation Error
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
};

/**
 * @desc     Delete message
 * @route    DELETE /api/messages/:id
 * @access   Private
 */
const deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const { id: userId } = req.user;

    // Message Check
    const existingMessage = await pool.query(
      'SELECT * FROM messages WHERE id = $1',
      [messageId]
    );

    if (!existingMessage.rows[0]) {
      throw new Error('Message not found');
    }

    if (existingMessage.rows[0].user_id !== userId) {
      throw new Error('You are not authorized to delete this message');
    }

    // DELETE message
    const deletedMessage = await pool.query(
      'DELETE FROM messages WHERE id = $1 RETURNING *',
      [messageId]
    );

    res.status(200).json(deletedMessage.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getMessages, updateMessage, deleteMessage };
