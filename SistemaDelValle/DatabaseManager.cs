using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using MySql.Data.MySqlClient;
using System.Windows.Forms;

namespace SistemaDelValle
{

    public class DatabaseManager
    {

        private static string dbName = "escuela";
        private static string dbUser = Properties.Settings.Default.userMySQL;
        private static string dbPassword = Properties.Settings.Default.passMySQL;
        private static string dbIP = Properties.Settings.Default.serverMySQL;
        private string connectionString = $"server={dbIP};database={dbName};user={dbUser};password={dbPassword};";


        // Método para abrir la conexión
        public  MySqlConnection OpenConnection()
        {
            MySqlConnection connection = new MySqlConnection(connectionString);

            try
            {
                connection.Open();
                //MessageBox.Show("Se conecto a la base de datos", "Conexión Exitosa", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (MySqlException ex)
            {
                // Manejo del error de conexión
                FormConexion configuracionServidor = new FormConexion();
                configuracionServidor.ShowDialog();
                //MessageBox.Show($"Error al conectar a la base de datos: {ex.Message}", "Error de Conexión", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return null;
            }

            return connection;
        }

        // Método para cerrar la conexión
        private void CloseConnection(MySqlConnection connection)
        {
            if (connection != null)
            {
                connection.Close();
            }
        }

        public (bool Exito, string Mensaje, int IdUsuario, string NombreUsuario, string Nombre, string Apaterno, string Amaterno, int PermisoId) Login(string nombreUsuario, string contraseña)
        {
            using (var connection = OpenConnection())
            {
                if (connection == null)
                {
                    return (false, "No se pudo conectar a la base de datos", 0, null, null, null, null, 0);
                }

                using (var command = new MySqlCommand("LoginUsuario", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("p_nombre_usuario", nombreUsuario);
                    command.Parameters.AddWithValue("p_contraseña", contraseña);

                    // Parámetros de salida
                    command.Parameters.Add("p_id_usuario", MySqlDbType.Int32).Direction = System.Data.ParameterDirection.Output;
                    command.Parameters.Add("p_nombre_usuario_resultado", MySqlDbType.VarChar, 16).Direction = System.Data.ParameterDirection.Output;
                    command.Parameters.Add("p_nombre", MySqlDbType.VarChar, 100).Direction = System.Data.ParameterDirection.Output;
                    command.Parameters.Add("p_apaterno", MySqlDbType.VarChar, 100).Direction = System.Data.ParameterDirection.Output;
                    command.Parameters.Add("p_amaterno", MySqlDbType.VarChar, 100).Direction = System.Data.ParameterDirection.Output;
                    command.Parameters.Add("p_permiso_id", MySqlDbType.Int32).Direction = System.Data.ParameterDirection.Output;
                    command.Parameters.Add("p_mensaje", MySqlDbType.VarChar, 255).Direction = System.Data.ParameterDirection.Output;

                    try
                    {
                        command.ExecuteNonQuery();

                        // Obtener los resultados con verificaciones
                        bool exito = command.Parameters["p_mensaje"].Value.ToString() == "Login exitoso";
                        string mensaje = command.Parameters["p_mensaje"].Value.ToString();

                        int idUsuario = command.Parameters["p_id_usuario"].Value != DBNull.Value ? Convert.ToInt32(command.Parameters["p_id_usuario"].Value) : 0;
                        string nombreUsuarioResultado = command.Parameters["p_nombre_usuario_resultado"].Value != DBNull.Value ? command.Parameters["p_nombre_usuario_resultado"].Value.ToString() : null;
                        string nombre = command.Parameters["p_nombre"].Value != DBNull.Value ? command.Parameters["p_nombre"].Value.ToString() : null;
                        string apaterno = command.Parameters["p_apaterno"].Value != DBNull.Value ? command.Parameters["p_apaterno"].Value.ToString() : null;
                        string amaterno = command.Parameters["p_amaterno"].Value != DBNull.Value ? command.Parameters["p_amaterno"].Value.ToString() : null;
                        int permisoId = command.Parameters["p_permiso_id"].Value != DBNull.Value ? Convert.ToInt32(command.Parameters["p_permiso_id"].Value) : 0;

                        return (exito, mensaje, idUsuario, nombreUsuarioResultado, nombre, apaterno, amaterno, permisoId);
                    }
                    catch (Exception ex)
                    {
                        // Manejo de errores
                        return (false, $"Error: {ex.Message}", 0, null, null, null, null, 0);
                    }
                }
            }
        }

    }

}
