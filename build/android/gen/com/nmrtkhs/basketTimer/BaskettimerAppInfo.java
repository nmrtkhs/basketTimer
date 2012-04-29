package com.nmrtkhs.basketTimer;

import org.appcelerator.titanium.ITiAppInfo;
import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.TiProperties;
import org.appcelerator.titanium.util.Log;

/* GENERATED CODE
 * Warning - this class was generated from your application's tiapp.xml
 * Any changes you make here will be overwritten
 */
public final class BaskettimerAppInfo implements ITiAppInfo
{
	private static final String LCAT = "AppInfo";
	
	public BaskettimerAppInfo(TiApplication app) {
		TiProperties properties = app.getSystemProperties();
					
					properties.setString("ti.deploytype", "development");
	}
	
	public String getId() {
		return "com.nmrtkhs.basketTimer";
	}
	
	public String getName() {
		return "BasketTimer";
	}
	
	public String getVersion() {
		return "1.0";
	}
	
	public String getPublisher() {
		return "nmrtkhs";
	}
	
	public String getUrl() {
		return "http://";
	}
	
	public String getCopyright() {
		return "2011 by nmrtkhs";
	}
	
	public String getDescription() {
		return "not specified";
	}
	
	public String getIcon() {
		return "appicon.png";
	}
	
	public boolean isAnalyticsEnabled() {
		return true;
	}
	
	public String getGUID() {
		return "aa7d95b4-40a7-45ab-9fb5-e6d9f3311643";
	}
	
	public boolean isFullscreen() {
		return false;
	}
	
	public boolean isNavBarHidden() {
		return false;
	}
}
