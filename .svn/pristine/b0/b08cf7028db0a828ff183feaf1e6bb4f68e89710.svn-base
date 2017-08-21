package text;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class Serversocket {
	public static void main(String args[]){
		try {
			ServerSocket server = new ServerSocket(9000);
			System.out.println("Server is start");
			new SocketThread(server.accept());
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
class SocketThread extends Thread{
	public static Map<String,Socket> map = new HashMap<String, Socket>();
	private Date date = new Date();
	
	Socket socket = null;
	public SocketThread(Socket socket){
		System.out.println(socket.getInetAddress());
		map.put(String.valueOf(date.getTime()), socket);
		this.socket = socket;
		start();
	}
	public void run(){
		try {
			BufferedReader buffer = new BufferedReader(new InputStreamReader(this.socket.getInputStream()));
			PrintWriter print = new PrintWriter(new OutputStreamWriter(this.socket.getOutputStream()));
			this.socket.isConnected();
			while(true){
				String line = buffer.readLine();
				if(line.equals("bye")){
					print.close();
					buffer.close();
					this.socket.close();
				}
				if(line != null){
					print.write(line);
					print.flush();
				}
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
