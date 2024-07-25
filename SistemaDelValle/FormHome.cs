using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;

namespace SistemaDelValle
{

    public partial class FormHome : Form
    {
        private string nombreUsuario;
        private string apaternoUsuario;
        private string username;
        private Form main;
        public FormHome(string nombreUsuario, string apaternoUsuario, string username, Form main)
        {
            this.nombreUsuario = nombreUsuario;
            this.apaternoUsuario = apaternoUsuario;
            this.username = username;
            this.main = main;

            InitializeComponent();

            txtNombre.Text = nombreUsuario + " " + apaternoUsuario;
            txtUsuario.Text = username;

        }

        private void FormHome_FormClosed(object sender, FormClosedEventArgs e)
        {
            main.Show();
        }

        private void FormHome_Load(object sender, EventArgs e)
        {
            AbrirFormularioHijo(new FormPanelMenu(this), this.panelPrincipal);
        }

        public void AbrirFormularioHijo(Form formHijo, Panel panelContenedor)
        {
            while (panelContenedor.Controls.Count > 0)
            {
                panelContenedor.Controls.RemoveAt(0);
            }
                

            Form form = formHijo;
            form.TopLevel = false;
            form.Dock = DockStyle.Fill;
            panelContenedor.Controls.Add(form);
            panelContenedor.Tag = form;
            form.Show();
        }

        private void btnHome_Click(object sender, EventArgs e)
        {
            AbrirFormularioHijo(new FormPanelMenu(this), this.panelPrincipal);
        }
    }
}
