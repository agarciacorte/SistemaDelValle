using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SistemaDelValle
{
    public partial class FormLogin : Form
    {
        private DatabaseManager dbManager;
        public FormLogin()
        {
            InitializeComponent();
            dbManager = new DatabaseManager();
        }

        private void btnSalir_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void btnLoin_Click(object sender, EventArgs e)
        {
            
        }
        private void btnLogin_Click(object sender, EventArgs e)
        {
            string nombreUsuario = txtUsuario.Text;
            string contraseña = txtPassword.Text;

            // Llamar al método Login del DatabaseManager
            var resultado = dbManager.Login(nombreUsuario, contraseña);

            if (resultado.Exito)
            {
                // Login exitoso
                //MessageBox.Show($"Bienvenido {resultado.Nombre} {resultado.Apaterno} {resultado.Amaterno} ({resultado.NombreUsuario})", "Login Exitoso", MessageBoxButtons.OK, MessageBoxIcon.Information);

                // Aquí puedes proceder a abrir el siguiente formulario o realizar otras acciones necesarias
                // Ejemplo:
                FormHome formhome = new FormHome(resultado.Nombre, resultado.Apaterno, resultado.NombreUsuario, this);
                formhome.Show();
                this.Hide();
            }
            else
            {
                // Login fallido
                MessageBox.Show(resultado.Mensaje, "Error de Login", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }

        }
    }
}
